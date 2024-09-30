import { Request, Response } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
  SessionInput,
} from "../schemas/user.schema";
import {
  createUser,
  findUserById,
  findUserByEmail,
} from "../services/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/user.service";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt";
import sendEmail from "../utils/mailer";
import { nanoid } from "nanoid";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createUser(body);

    await sendEmail({
      to: user.email,
      from: "test@example.com",
      subject: "Verify your email",
      text: `verification code: ${user.verificationCode}. Id: ${user._id}`,
    });

    return res.send("User successfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("Account already exists");
    }

    return res.status(500).send(e);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput>,
  res: Response
) {
  const { id, verificationCode } = req.params;

  try {
    // find user by id
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.verified) {
      return res.status(400).send("User already verified");
    }
    // check if the verification code is correct
    if (user.verificationCode === verificationCode) {
      user.verified = true;
      await user.save();
      return res.send("User successfully verified");
    }
    return res.status(400).send("Invalid verification code");
  } catch (e: any) {
    return res.status(400).send(e);
  }
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;

  const { password } = req.body;

  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send("Could not reset user password");
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return res.send("Successfully updated password");
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  // extract email
  const { email } = req.body;
  // find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).send("User not found. Please sign up");
  }

  if (!user.verified) {
    return res.status(400).send("User not verified");
  }
  // generate reset code
  const passwordResetCode = nanoid();
  user.passwordResetCode = passwordResetCode;
  await user.save();
  // send email with reset code
  await sendEmail({
    to: user.email,
    from: "test@gmail.com",
    subject: "Password Reset",
    text: `Password reset code: ${passwordResetCode}`,
  });

  return res.send("Password reset code sent");
}

export async function createSessionHandler(
  req: Request<{}, {}, SessionInput>,
  res: Response
) {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.send("Invalid email or password");
  }

  if (!user.verified) {
    return res.send("User not verified");
  }

  const isValid = await user.validatePassword(password);

  if (!isValid) {
    return res.send("Invalid email or password");
  }

  // sign a access token
  const accessToken = signAccessToken(user);

  // sign a refresh token
  const refreshToken = await signRefreshToken({ userId: user._id });

  // send the tokens

  return res.send({
    accessToken,
    refreshToken,
  });
}
export async function refreshAccessTokenHandler(req: Request, res: Response) {
  const refreshToken = get(req, "headers.x-refresh");

  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded) {
    return res.status(401).send("Could not refresh access token");
  }

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid) {
    return res.status(401).send("Could not refresh access token");
  }

  const user = await findUserById(String(session.user));

  if (!user) {
    return res.status(401).send("Could not refresh access token");
  }

  const accessToken = signAccessToken(user);

  return res.send({ accessToken });
}

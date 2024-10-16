import UserModel, { User, privateFields } from "../models/user.model";
import SessionModel from "../models/session.model";
import PostModel, { Post } from "../models/post.model";
import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import { signJwt } from "../utils/jwt";

export function createUser(input: Partial<User>) {
  return UserModel.create(input);
}

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByIdAndUpdate(id: string, savedPost: Partial<Post>) {
  return UserModel.findByIdAndUpdate(
    id,
    { $push: { posts: savedPost._id } },
    { new: true }
  );
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function signAccessToken(user: DocumentType<User>) {
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "30d",
  });

  return accessToken;
}
export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    "refreshTokenPrivateKey",
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

import jwt from "jsonwebtoken";

export function signJwt(
  object: Object,
  KeyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) {
  const signinKey = Buffer.from(process.env[KeyName]!, "base64").toString(
    "ascii"
  );
  return jwt.sign(object, signinKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(
  token: string,
  KeyName: "accessTokenPublicKey" | "refeshTokenPublicKey"
) {
  const publicKey = Buffer.from(process.env[KeyName]!, "base64").toString(
    "ascii"
  );

  try {
    const decoded = jwt.verify(token, publicKey) as T | null;
    return decoded;
  } catch (e) {
    return null;
  }
}

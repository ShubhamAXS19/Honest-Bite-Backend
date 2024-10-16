import { NextFunction, Request, Response } from "express";

const attachAuthorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body.Author = res.locals.user._id;
  console.log("Author attached to post");
  next();
};

export default attachAuthorMiddleware;

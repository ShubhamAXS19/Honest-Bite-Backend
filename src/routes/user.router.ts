import express from "express";
import {
  createUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  createSessionHandler,
} from "../controllers/user.contoller";
import validateResource from "../middlewares/validateResource";
import {
  createUserSchema,
  verifyUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  createSessionSchema,
} from "../schemas/user.schema";

const router = express.Router();

router.post("/register", validateResource(createUserSchema), createUserHandler);

router.post(
  "/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);
router.post(
  "/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.post(
  "/forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "/sessions",
  validateResource(createSessionSchema),
  createSessionHandler
);
export default router;

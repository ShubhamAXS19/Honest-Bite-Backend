import express from "express";
import {
  createUserHandler,
  verifyUserHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  createSessionHandler,
  refreshAccessTokenHandler,
  getCurrentUserHandler,
  requireUser,
  logoutHandler,
  editMeHandler,
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

router.get("/logout", requireUser, logoutHandler);
router.get("/:id/edit-me", requireUser, editMeHandler);
router.post("/register", validateResource(createUserSchema), createUserHandler);
router.get("/:id/me", requireUser, getCurrentUserHandler);

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

router.post("/sessions/refresh", refreshAccessTokenHandler);

export default router;

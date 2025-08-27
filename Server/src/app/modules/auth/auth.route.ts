import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import passport from "passport";
import { envVariables } from "../../config/env";

const router = Router();

router.post("/login", authControllers.credentialsLogin);
router.post("/refresh-token", authControllers.getNewAccessToken);
router.post("/logout", authControllers.logout);
router.post(
  "/change-password",
  checkAuth(...Object.values(UserRole)),
  authControllers.changePassword
);
router.post(
  "/set-password",
  checkAuth(...Object.values(UserRole)),
  authControllers.setPassword
);
router.post("/forgot-password", authControllers.forgotPassword);
router.post(
  "/reset-password",
  checkAuth(...Object.values(UserRole)),
  authControllers.resetPassword
);
// FrontEnd -> forgot-password -> email -> user status check -> short expiration token (valid for 10 mins) -> FrontEnd link http:localhost"5173/forgot-password?email=sahabulislamsifat@gmail.com&token=token -> frontend query theke user er email and token extract kore anbo. -> new password user theke nibe -> backend er /reset-password api -> authorization = token -> newPassword -> token verify -> password hash -> save user password

// booking -> / login -> successful google login -> / booking frontend
// login -> successful google login -> / frontend
router.get(
  "/google",
  async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/";
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: redirect as string,
    })(req, res, next);
  }
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${envVariables.FRONTEND_URL}/login?error=There is some issues with your account. Please contact with our support team!`,
  }),
  authControllers.googleCallbackController
);

export const authRoutes = router;

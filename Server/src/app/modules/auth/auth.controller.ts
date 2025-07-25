import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/createAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authService } from "./auth.service";
import AppError from "../../errorHelper/AppError";
import { setAuthCookie } from "../../utils/setCookies";
import { createUserTokens } from "../../utils/userToken";
import { envVariables } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await authService.credentialsLogin(req.body);

  // res.cookie("accessToken", loginInfo.refreshToken, {
  //   httpOnly: true,
  //   secure: false,
  // });

  // res.cookie("refreshToken", loginInfo.refreshToken, {
  //   httpOnly: true,
  //   secure: false,
  // });
  setAuthCookie(res, loginInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Login Successfully",
    data: loginInfo,
  });
});

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "No refresh token received from cookies..."
    );
  }

  const tokenInfo = await authService.getNewAccessToken(refreshToken as string);

  setAuthCookie(res, refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "New access token retrieved Successfully",
    data: tokenInfo,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Logout Successfully",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const decodedToken = req.user;

  await authService.resetPassword(
    oldPassword,
    newPassword,
    decodedToken as JwtPayload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password changed Successfully",
    data: null,
  });
});

const googleCallbackController = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    let redirectTo = req.query.state ? (req.query.state as string) : "";
    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;
    // console.log("User save from Google auth:", user);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);

    // sendResponse(res, {
    //   success: true,
    //   statusCode: httpStatus.OK,
    //   message: "Password changed Successfully",
    //   data: null,
    // });
    res.redirect(`${envVariables.FRONTEND_URL}/${redirectTo}`);
  }
);

export const authControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackController,
};

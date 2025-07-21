import { Request, Response } from "express";
import { catchAsync } from "../../utils/createAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { authService } from "./auth.service";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await authService.credentialsLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Login Successfully",
    data: loginInfo,
  });
});

export const authControllers = {
  credentialsLogin,
};

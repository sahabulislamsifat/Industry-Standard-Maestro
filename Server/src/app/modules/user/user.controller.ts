/* eslint-disable @typescript-eslint/no-unused-vars */

// import AppError from "../../errorHelper/AppError";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/createAsync";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { UserService } from "./user.service";
// import { verifyToken } from "../../utils/jwt";
// import { envVariables } from "../../config/env";
// import { JwtPayload } from "jsonwebtoken";

// const createUserFunction = async (req: Request, res: Response) => {
//   const newUser = await UserService.createUser(req.body);
//   res
//     .status(httpStatus.CREATED)
//     .json({ message: "User created} successfully", user: newUser });
// };

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // const userData: IUser = req.body;
//     // const newUser = await UserModel.create(userData);
//     // throw new Error('Error happen!!')
//     // throw new AppError(httpStatus.BAD_REQUEST, 'fake error')

//     // const newUser = await UserService.createUser(req.body);
//     // res
//     //   .status(httpStatus.CREATED)
//     //   .json({ message: "User created} successfully", user: newUser });
//     createUserFunction(req, res);
//   } catch (err: any) {
//     // eslint-disable-next-line no-console
//     console.error("Error creating user:", err);
//     // res
//     //   .status(httpStatus.BAD_REQUEST)
//     //   .json({
//     //     message: `Internal server error ${err.message} from user controller`,
//     //     err,
//     //   });
//     next(err);
//   }

// res
//   .status(httpStatus.CREATED)
//   .json({ message: "User created} successfully", user: newUser });

// res.status(httpStatus.OK).json({
//   success: true,
//   message: "All user Retrieved Successfully!!!",
//   data: users,
// });

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await UserService.createUser(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created Successfully",
      data: newUser,
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUsers();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All Users Retrieved Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await UserService.getSingleUser(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User retrieved Successfully",
      data: result.data,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserService.getMe(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Your profile Retrieved Successfully",
      data: result.data,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    // const token = req.headers.authorization;
    // const verifiedToken = verifyToken(
    //   token as string,
    //   envVariables.JWT_ACCESS_SECRET
    // ) as JwtPayload;
    if (!req.user) {
      throw new Error("Unauthorized access: no user found in request");
    }

    const verifiedToken = req.user as JwtPayload;

    const payload = req.body;
    const user = await UserService.updateUser(userId, payload, verifiedToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created Successfully",
      data: user,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  getMe,
  updateUser,
};

// route matching -> controller -> service -> model -> DB

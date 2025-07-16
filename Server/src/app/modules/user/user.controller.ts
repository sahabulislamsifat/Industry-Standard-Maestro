/* eslint-disable @typescript-eslint/no-unused-vars */

// import AppError from "../../errorHelper/AppError";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserService } from "./user.services";
import { catchAsync } from "../../utils/createAsync";
import { success } from "zod";
import { sendResponse } from "../../utils/sendResponse";

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

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await UserService.createUser(req.body);
    // res
    //   .status(httpStatus.CREATED)
    //   .json({ message: "User created} successfully", user: newUser });

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

    // res.status(httpStatus.OK).json({
    //   success: true,
    //   message: "All user Retrieved Successfully!!!",
    //   data: users,
    // });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User created Successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
};

// route matching -> controller -> service -> model -> DB

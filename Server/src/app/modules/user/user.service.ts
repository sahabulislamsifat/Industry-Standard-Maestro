import AppError from "../../errorHelper/AppError";
import { IauthProvider, IUser, UserRole } from "./user.interface";
import { UserModel } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { envVariables } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await UserModel.findOne({ email });
  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist!!");
  }

  const hashedPassword = await bcryptjs.hash(
    password as string,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  const authProvider: IauthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await UserModel.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await UserModel.find({});

  const totalUsers = await UserModel.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const getSingleUser = async (id: string) => {
  const user = await UserModel.findById(id).select("-password");

  return {
    data: user,
  };
};

const getMe = async (id: string) => {
  const result = await UserModel.findById(id).select("-password");

  return {
    data: result,
  };
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await UserModel.findById(userId);
  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }
  // Email can't update
  // name, phone, password and address
  // password re-hashing
  // only admin superAdmin - role isDeleted
  // promoting to superAdmin - superAdmin

  if (payload.role) {
    if (
      decodedToken.role === UserRole.USER ||
      decodedToken.role === UserRole.GUIDE
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized ");
    }
    if (
      payload.role === UserRole.SUPER_ADMIN &&
      decodedToken.role === UserRole.ADMIN
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized ");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (
      decodedToken.role === UserRole.USER ||
      decodedToken.role === UserRole.GUIDE
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized ");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVariables.BCRYPT_SALT_ROUND
    );
  }
  const newUpdateUser = await UserModel.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return newUpdateUser;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  getMe,
  updateUser,
};

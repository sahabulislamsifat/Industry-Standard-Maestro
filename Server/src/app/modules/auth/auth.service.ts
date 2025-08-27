/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import AppError from "../../errorHelper/AppError";
// import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import {
  createNewAccessTokenWithRefreshToken,
  // createUserTokens,
} from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVariables } from "../../config/env";
import { IauthProvider, IsActive } from "../user/user.interface";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail";

// const credentialsLogin = async (payload: Partial<IUser>) => {
//   const { email, password } = payload;

//   const isUserExist = await UserModel.findOne({ email });

//   if (!isUserExist) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist...");
//   }

//   const isPasswordMatched = await bcryptjs.compare(
//     password as string,
//     isUserExist.password as string
//   );
//   if (!isPasswordMatched) {
//     throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
//   }

//   // const jwtPayload = {
//   //   userId: isUserExist._id,
//   //   email: isUserExist.email,
//   //   role: isUserExist.role,
//   // };
//   // const accessToken = generateToken(
//   //   jwtPayload,
//   //   envVariables.JWT_ACCESS_SECRET,
//   //   envVariables.JWT_ACCESS_EXPIRES
//   // );
//   // const refreshToken = generateToken(
//   //   jwtPayload,
//   //   envVariables.JWT_REFRESH_SECRET,
//   //   envVariables.JWT_REFRESH_EXPIRES
//   // );

//   const userTokens = createUserTokens(isUserExist);

//   // delete isUserExist.password;
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password: pass, ...rest } = isUserExist.toObject();

//   return {
//     // email: isUserExist.email,
//     accessToken: userTokens.accessToken,
//     refreshToken: userTokens.refreshToken,
//     user: rest,
//   };
// };

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );

  return { accessToken: newAccessToken };
};

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await UserModel.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    user!.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Old password dose not match...."
    );
  }
  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );
  await user!.save();

  return true;
};

const setPassword = async (userId: string, plainPassword: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  if (
    user.password &&
    user.auths?.some((providerObject) => providerObject.provider === "google")
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You have already set a password. Now you can change the password from your profile update."
    );
  }
  const hashedPassword = await bcryptjs.hash(
    plainPassword,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  const credentialProvider: IauthProvider = {
    provider: "credentials",
    providerId: user.email,
  };
  const auths: IauthProvider[] = [...(user.auths || []), credentialProvider];
  user.password = hashedPassword;
  user.auths = auths;
  await user.save();
  return true;
};

const forgotPassword = async (email: string) => {
  const isUserExist = await UserModel.findOne({ email });

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }
  if (!isUserExist.isVerified) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is not verified");
  }
  if (
    isUserExist.isActive === IsActive.BLOCKED ||
    isUserExist.isActive === IsActive.INACTIVE
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `User is ${isUserExist.isActive}`
    );
  }
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
  }

  // send email to user with a link to reset password
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const resetToken = jwt.sign(jwtPayload, envVariables.JWT_ACCESS_SECRET, {
    expiresIn: "10m",
  });

  const resetUILink = `${envVariables.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`;

  sendEmail({
    to: isUserExist.email,
    subject: "Password Reset",
    templateName: "forgetPassword",
    templateData: {
      name: isUserExist.name,
      resetUILink,
    },
  });
};

const resetPassword = async (
  payload: Record<string, any>,
  decodedToken: JwtPayload
) => {
  if (payload.id != decodedToken.userId) {
    throw new AppError(401, "You can not reset your password");
  }

  const isUserExist = await UserModel.findById(decodedToken.userId);
  if (!isUserExist) {
    throw new AppError(401, "User does not exist");
  }

  const hashedPassword = await bcryptjs.hash(
    payload.newPassword,
    Number(envVariables.BCRYPT_SALT_ROUND)
  );

  isUserExist.password = hashedPassword;

  await isUserExist.save();
};

export const authService = {
  // credentialsLogin,
  getNewAccessToken,
  changePassword,
  setPassword,
  forgotPassword,
  resetPassword,
};

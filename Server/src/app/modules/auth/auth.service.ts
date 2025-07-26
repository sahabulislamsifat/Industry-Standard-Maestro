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

const resetPassword = async (
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

export const authService = {
  // credentialsLogin,
  getNewAccessToken,
  resetPassword,
};

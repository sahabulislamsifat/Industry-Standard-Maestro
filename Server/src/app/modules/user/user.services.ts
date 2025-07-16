import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await UserModel.create({
    name,
    email,
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

export const UserService = {
  createUser,
  getAllUsers,
};

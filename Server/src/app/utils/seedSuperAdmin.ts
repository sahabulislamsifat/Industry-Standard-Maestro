import { envVariables } from "../config/env";
import { IauthProvider, UserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await UserModel.findOne({
      email: envVariables.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exist!!");
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVariables.SUPER_ADMIN_PASSWORD,
      Number(envVariables.BCRYPT_SALT_ROUND)
    );

    const authProvider: IauthProvider = {
      provider: "credentials",
      providerId: envVariables.SUPER_ADMIN_EMAIL,
    };

    const payload = {
      name: "Super Admin",
      role: UserRole.SUPER_ADMIN,
      email: envVariables.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      isVerified: true,
      auths: [authProvider],
    };
    const superAdmin = await UserModel.create(payload);
    console.log("Super Admin Created Successfully", superAdmin);
  } catch (error) {
    console.log(error);
  }
};

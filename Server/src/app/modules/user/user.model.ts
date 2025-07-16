import { model, Schema } from "mongoose";
import { IsActive, IUser, UserRole } from "./user.interface";

const authProviderSchema = new Schema({
  provider: { type: String, required: true },
  providerId: { type: String, required: true },
});

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: Boolean, default: false },

    isAction: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    authProvider: [authProviderSchema],
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<IUser>("User", userSchema);

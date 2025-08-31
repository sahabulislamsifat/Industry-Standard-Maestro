import { Types } from "mongoose";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

//* auth provider
// Auth providers for user authentication
// email and password,
// google, facebook, apple, etc authentications.

export interface IauthProvider {
  provider: "google" | "credentials";
  providerId: string;
  email?: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  address?: string;
  isDeleted?: string;
  isActive?: IsActive;
  isVerified?: boolean;
  role?: UserRole;
  auths?: IauthProvider[];
  Bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
  updatedAt?: Date;
  createdAt?: Date;
}

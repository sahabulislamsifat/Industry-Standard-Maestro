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
  provider: string; // e.g., 'google', 'facebook', 'email'
  providerId: string; // Unique identifier for the provider
  email?: string; // Optional email for email-based authentication
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  name: string; // Full name of the user
  email: string; // Email address of the user
  password?: string; // Optional password for email-based authentication
  phone?: string; // Optional phone number of the user
  picture?: string; // Optional profile picture URL
  address?: string; // Optional address of the user
  isDeleted?: boolean; // Flag to indicate if the user is deleted
  isActive?: boolean; // Flag to indicate if the user is active
  isVerified?: boolean; // Flag to indicate if the user is verified
  role?: UserRole; // Role of the user (e.g., SUPER_ADMIN, ADMIN, USER, GUIDE)
  authProvider?: IauthProvider[];
  // Array of authentication providers associated with the user
  Bookings?: Types.ObjectId[]; // Array of booking IDs associated with the user
  guides?: Types.ObjectId[]; // Array of guide IDs associated with the user
  createdAt?: Date; // Timestamp when the user was created
  updatedAt?: Date; // Timestamp when the user was last updated
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// FrontEnd -> Form Data with Image/File -> Multer -> from data -> Req (Body + File)
// Our file -> Image -> from data -> file -> multer -> self folder (Temporary) -> req.file
// req.file -> cloudinary (req.body) -> url -> mongoDB(Mongoose) -> FrontEnd (URL)

import { v2 as cloudinary } from "cloudinary";
import { envVariables } from "./env";
import AppError from "../errorHelper/AppError";

cloudinary.config({
  cloud_name: envVariables.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
  api_key: envVariables.CLOUDINARY.CLOUDINARY_API_KEY,
  api_secret: envVariables.CLOUDINARY.CLOUDINARY_API_SECRET,
});

export const deleteImageFromCloudinary = async (url: string) => {
  try {
    //https://res.cloudinary.com/djzppynpk/image/upload/v1753126572/ay9roxiv8ue-1753126570086-download-2-jpg.jpg.jpg

    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
    const match = url.match(regex);
    // console.log({ match });

    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
      console.log(`File ${public_id} is deleted from cloudinary`);
    }
  } catch (error: any) {
    throw new AppError(401, "Cloudinary image deletion failed", error.message);
  }
};

export const cloudinaryUpload = cloudinary;

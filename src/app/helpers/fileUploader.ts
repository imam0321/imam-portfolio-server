import multer from "multer"
import path from "path"
import fs from "fs/promises"
import { v2 as cloudinary } from "cloudinary"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/AppError"
import httpStatus from "http-status-codes"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: Express.Multer.File) => {
  cloudinary.config({
    cloud_name: envVars.CLOUDINARY.CLOUDINARY_CLOUD_NAME,
    api_key: envVars.CLOUDINARY.CLOUDINARY_CLOUD_API_KEY,
    api_secret: envVars.CLOUDINARY.CLOUDINARY_CLOUD_API_SECRET
  });

  if (!file?.path) throw new AppError(httpStatus.NOT_FOUND, "No file path found for upload");

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "imam-portfolio",
      public_id: file.filename,
    });

    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to upload file to Cloudinary");
  } finally {
    await fs.unlink(file.path).catch(() => { });
  }
};

export const deleteImageFroCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;

    const match = url.match(regex);

    if (match && match[1]) {
      const public_id = match[1];
      await cloudinary.uploader.destroy(public_id);
    }
  } catch (error: any) {
    throw new AppError(401, "Cloudinary image deletion failed", error.message);
  }
};


export const fileUploader = {
  upload,
  uploadToCloudinary,
  deleteImageFroCloudinary
}
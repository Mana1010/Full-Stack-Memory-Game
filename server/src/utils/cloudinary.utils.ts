import { v2 as cloudinary } from "cloudinary";
export async function uploadFileCloudinary(file: string) {
  return await cloudinary.uploader.upload(file, {
    folder: "memory-game/profile-picture",
    upload_preset: "yxnopucd",
  });
}

export async function deleteFileCloudinary(file: string[]) {
  return await cloudinary.api.delete_resources(file, {
    type: "upload",
    resource_type: "image",
  });
}

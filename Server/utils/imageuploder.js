require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageToCloudinary = async (filePath, folder, height, quality) => {
  const options = { folder };
  if (height) options.height = height;
  if (quality) options.quality = quality;
  options.resource_type = 'auto';
 
  try {
    return await cloudinary.uploader.upload(filePath, options);
  } catch (error) {
    console.error('Error while uploading image:', error);
    throw error;
  }
};

const deleteResourceFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted resource with public ID: ${publicId}`);
    return result;
  } catch (error) {
    console.error(`Error deleting resource with public ID ${publicId}:`, error);
    throw error;
  }
};

module.exports = {
  uploadImageToCloudinary,
  deleteResourceFromCloudinary,
};

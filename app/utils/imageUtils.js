// utils/imageUtils.js
export const getImagesArray = (imageData) => {
  if (!imageData) return [];
  if (Array.isArray(imageData)) return imageData;
  return [imageData];
};
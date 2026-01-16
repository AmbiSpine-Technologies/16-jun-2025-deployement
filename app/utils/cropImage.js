


export default async function getCroppedImageBlobUrl({
  imageSrc,
  pixelCrop,           // { x, y, width, height }
  outputWidth = null,
  outputHeight = null,
  rotation = 0,
  filters = "",
  mimeType = "image/jpeg",
  quality = 0.9,
}) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const srcW = img.naturalWidth;
        const srcH = img.naturalHeight;

        // clamp crop area
     const sx = pixelCrop ? Math.max(0, Math.min(pixelCrop.x, srcW)) : 0;
const sy = pixelCrop ? Math.max(0, Math.min(pixelCrop.y, srcH)) : 0;
const sWidth = pixelCrop ? pixelCrop.width : srcW;
const sHeight = pixelCrop ? pixelCrop.height : srcH;

        const outW = outputWidth || sWidth;
        const outH = outputHeight || sHeight;

        const canvas = document.createElement("canvas");
        canvas.width = outW;
        canvas.height = outH;
        const ctx = canvas.getContext("2d");

        ctx.filter = filters || "none";

        ctx.save();
        ctx.translate(outW / 2, outH / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-outW / 2, -outH / 2);

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, outW, outH);

        ctx.restore();

        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error("Canvas is empty"));
          const url = URL.createObjectURL(blob);
          resolve({ blob, url });
        }, mimeType, quality);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(err);
    img.src = imageSrc;
  });
}

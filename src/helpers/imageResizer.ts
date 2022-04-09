import fs from "fs/promises";
import sharp from "sharp";

interface ResizeImage {
   width: number;
   height: number;
   filePathImage: string;
   filePathThumb: string;
}

// resize image of given path and saves it to the given thumb path
// also returns the buffer of resized successfully
const resizeImage = async ({
   width,
   height,
   filePathImage,
   filePathThumb,
}: ResizeImage): Promise<Buffer> => {
   const data: Buffer | null = await fs
      .readFile(filePathImage)
      .catch(() => null);

   if (!data) {
      return Promise.reject();
   }

   const imageBuffer: Buffer | null = await sharp(data)
      .resize(width, height)
      .toBuffer()
      .catch(() => null);

   if (!imageBuffer) {
      return Promise.reject();
   }

   return fs
      .writeFile(filePathThumb, imageBuffer)
      .then(() => {
         return imageBuffer;
      })
      .catch(() => {
         return Promise.reject();
      });
};

export default { resizeImage };

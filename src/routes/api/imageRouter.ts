import express, { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
import { Stats } from "fs";
import imageResizer from "../../helpers/imageResizer";

const imageRouter = express.Router();

imageRouter.get("/", async (req: Request, res: Response): Promise<void> => {
   const filename = req.query["filename"];
   const height = req.query["height"]
      ? parseInt(req.query["height"] as string, 10)
      : null;
   const width = req.query["width"]
      ? parseInt(req.query["width"] as string, 10)
      : null;

   if (!filename || !height || !width) {
      res.status(400).send(
         "Please make sure url contains correct filename, height and width params"
      );
      return;
   }

   const filePathImage = `${path.resolve(
      __dirname,
      `../../../assets/full/${filename}.jpg`
   )}`;

   const filePathThumb = `${path.resolve(
      __dirname,
      `../../../assets/thumb/${filename}-${height}x${width}.jpg`
   )}`;

   const fullImg: Stats | null = await fs.stat(filePathImage).catch(() => {
      res.status(404).send("Image does not exist");
      return null;
   });

   if (!fullImg) {
      return;
   }

   const existingThumb: Stats | null = await fs
      .stat(filePathThumb)
      .catch(() => {
         return null;
      });

   if (existingThumb) {
      fs.readFile(filePathThumb)
         .then((thumbData: Buffer) => {
            res.status(200).contentType("jpg").send(thumbData);
         })
         .catch(() => {
            res.status(500).send("Error occured processing the image");
         });
   } else {
      // resizing the image
      imageResizer
         .resizeImage({
            filePathImage,
            filePathThumb,
            height,
            width,
         })
         .then((resizedImage: Buffer) => {
            res.status(200).contentType("jpg").send(resizedImage);
         })
         .catch(() => {
            res.status(500).send("Error occured processing the image");
         });
   }
});

export default imageRouter;

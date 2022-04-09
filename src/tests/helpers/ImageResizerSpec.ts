import path from "path";
import imageResizer from "../../helpers/imageResizer";

const filePathImage = path.resolve(__dirname, "../../../assets/full/fjord.jpg");
const filePathThumb = path.resolve(
   __dirname,
   "../../../assets/thumb/fjord.jpg"
);

describe("The imageResizer function", () => {
   it("returns a buffer after resizing an image sucessfully", async () => {
      const imageBuffer: Buffer = await imageResizer.resizeImage({
         height: 100,
         width: 150,
         filePathImage,
         filePathThumb,
      });
      expect(imageBuffer).toBeInstanceOf(Buffer);
   });

   it("rejects if something goes wrong", async (): Promise<void> => {
      await expectAsync(
         imageResizer.resizeImage({
            height: 100,
            width: 150,
            filePathImage: "",
            filePathThumb,
         })
      ).toBeRejected();
   });
});

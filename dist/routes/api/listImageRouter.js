"use strict";
// import express, { Response, Request } from 'express';
// import fs from 'fs/promises';
// import path from 'path';
// const listImageRouter = express.Router();
// listImageRouter.get('/', async (_req: Request, res: Response): Promise<void> => {
//     const folderPathFullImage = `${path.resolve(__dirname, '../../../assets/full')}`;
//     const files: string[] | null = await fs.readdir(folderPathFullImage).catch(() => {
//         res.status(500).send('Error occured reading the images');
//         return null;
//     });
//     if (!files) {
//         return;
//     }
// });
// export default listImageRouter;

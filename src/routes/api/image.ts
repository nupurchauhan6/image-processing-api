import express from "express";
import sharp from "sharp";
import path from "path";

const images = express.Router();

images.get("/", (req: express.Request, res: express.Response) => {
  const name = req.query.name as string;

  const width = parseInt(req.query.width as string);
  const height = parseInt(req.query.height as string);

  const filename = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "assets",
    "images",
    name
  );
  sharp(filename)
    .resize(width, height)
    .png()
    .toBuffer()
    .then((data) => {
      res.statusCode = 200;
      res.type("jpg").send(data);
    })
    .catch((error) => {
      res.statusCode = 500;
      res.send(error.message);
    });
});

export default images;

import express from "express";
import sharp from "sharp";
import path from "path";

const ImageRequestLoggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`Request to Image Router ${req.url} ${req.method}`);
  res.locals.filename = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "assets",
    "images",
    req.query.name as string
  );
  next();
};

const images = express.Router();
images.use(ImageRequestLoggerMiddleware);

images.get("/resize", (req: express.Request, res: express.Response) => {
  const width = Number(req.query.width as string);
  const height = Number(req.query.height as string);
  sharp(res.locals.filename)
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

images.get("/crop", (req: express.Request, res: express.Response) => {
  const width = Number(req.query.width as string);
  const height = Number(req.query.height as string);
  const left = Number(req.query.left as string);
  const top = Number(req.query.top as string);
  sharp(res.locals.filename)
    .extract({ width, height, left, top })
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

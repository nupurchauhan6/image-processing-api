import express from "express";
import path from "path";
import { resizeImage, cropImage } from "../../utilities/imageProcessing";

const ImageRequestLoggerMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(`Request to Image Router ${req.url} ${req.method}`);
  next();
};

const images = express.Router();
images.use(ImageRequestLoggerMiddleware);

images.get("/resize", async (req: express.Request, res: express.Response) => {
  const width = Number(req.query.width as string);
  const height = Number(req.query.height as string);
  const response = await resizeImage(req.query.name as string, width, height);
  if (response.statusCode === 200) {
    return res
      .status(response.statusCode)
      .sendFile(
        path.join(__dirname, "../../../assets", "images", response.body)
      );
  } else {
    return res.status(response.statusCode).send(`${response.body}`);
  }
});

images.get("/crop", async (req: express.Request, res: express.Response) => {
  const width = Number(req.query.width as string);
  const height = Number(req.query.height as string);
  const left = Number(req.query.left as string);
  const top = Number(req.query.top as string);

  const response = await cropImage(
    req.query.name as string,
    width,
    height,
    left,
    top
  );
  if (response.statusCode === 200) {
    return res
      .status(response.statusCode)
      .sendFile(
        path.join(__dirname, "../../../assets", "images", response.body)
      );
  } else {
    return res.status(response.statusCode).send(`${response.body}`);
  }
});

export default images;

import express from "express";
import images from "./api/image";
import files from "./api/file";

const routes = express.Router();

routes.use("/images", images);
routes.use("/files", files);

export default routes;

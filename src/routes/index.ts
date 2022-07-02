import express from "express";
import images from "./api/image";

const routes = express.Router();

routes.use('/images', images);

export default routes;
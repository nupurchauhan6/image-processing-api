import express from "express";
import multer from "multer";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

const files = express.Router();

files.post("/uploadFile", upload.single("myFile"), (req, res) => {
  try {
    var originalname = "";
    if (req.file) {
      originalname = req.file.originalname as string;
    }
    return res.send(`
  <div> 
    <p>File Uploaded Successfully!</p>
    <p> File Info: <br> ${JSON.stringify(req.file)} </p>
    <p> URL for resizing uploaded image: <a href="/api/images/resize/?name=${originalname}&width=1000&height=500">Link </a> </p>
    <p> URL for croping uploaded image: <a href="/api/images/crop/?name=${originalname}&width=1000&height=500&left=10&top=10">Link </a> </p>
    <p> Go to Home Page <a href="/"> Link </a>
  </div>`);
  } catch (error) {
    res.send(error);
  }
});

export default files;

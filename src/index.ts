import express from "express";
import routes from "./routes";
import path from "path";

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} ....`);
});

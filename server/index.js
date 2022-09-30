import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3002;

app.use(express.static(path.resolve("dist")));

app.get("/ping", (req, res) => {
  res.send("PONG!");
});

app.get("/*", (req, res) => {
  res.sendFile("index.html");
});

app.listen(port, () => console.log("Server started on port", 3002));

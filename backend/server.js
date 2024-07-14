import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import express from "express"

dotenv.config();

const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

mongoose
  .connect(process.env.DATA_BASE_URI)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

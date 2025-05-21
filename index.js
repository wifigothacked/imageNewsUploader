import express from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import cors from "cors";
import uploader from "./routes/uploader.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY, // Click 'View API Keys' above to copy your API secret
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
connectDB();

const upload = multer({ dest: "uploads/" });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api/v1/upload", upload.single("singleFile"), uploader);

app.listen(process.env.PORT || 4000, () => console.log("listening on 9005"));

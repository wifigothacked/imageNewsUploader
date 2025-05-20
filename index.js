import express from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import cors from "cors";
import uploader from "./routes/uploader.js";

const app = express();

cloudinary.config({
  cloud_name: "dmmkcjyid",
  api_key: "658848697291289",
  api_secret: "bvnWXCCnCNORKynRsbFV796KY0c", // Click 'View API Keys' above to copy your API secret
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://root:1234@cluster0.dgvfz.mongodb.net/digitalNewspaper?retryWrites=true&w=majority&appName=Cluster0`
    );
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

app.listen(9005, () => console.log("listening on 9005"));

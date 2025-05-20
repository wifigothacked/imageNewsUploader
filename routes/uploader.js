import express from "express";
import metadataModel from "../models/metadata.js";
import { v2 as cloudinary } from "cloudinary";

const router = express.Router();
router.use(express.json());

router.post("/:paperCode", async (req, res) => {
  //console.log(req.query);
  const { paperCode } = req.params;
  const { paperName, pageNumber } = req.query;
  const uploadResult = await cloudinary.uploader
    .upload(req.file.path, {
      public_id: paperName,
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);
  const result = await metadataModel.insertOne({
    name: uploadResult.public_id,
    path: uploadResult.secure_url,
    newsPaperName: paperCode,
    pageNumber: pageNumber,
  });
});

export default router;

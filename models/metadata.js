import mongoose from "mongoose";

const metadataSchema = new mongoose.Schema({
  name: String,
  path: String,
  newsPaperName: String,
  pageNumber: Number,
});

const metadataModel = mongoose.model("paper_metadatas", metadataSchema);

export default metadataModel;

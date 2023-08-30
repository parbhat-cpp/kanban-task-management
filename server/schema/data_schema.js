import mongoose from "mongoose";

const dataSchema = mongoose.Schema({
  Id: Number,
  status: String,
  title: String,
  description: String,
});

const DataModel = mongoose.model("data", dataSchema);

export default DataModel;

import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  datatype: { type: String, required: true },
  location: { type: String, required: true },
  formula: { type: String, required: true },
  datafile: { type: String, required: true },
  filename: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const DataModel = mongoose.model("Data", DataSchema);

export default DataModel;

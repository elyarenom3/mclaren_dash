import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  allData: [{ type: mongoose.Schema.Types.ObjectId, ref: "Data" }],
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
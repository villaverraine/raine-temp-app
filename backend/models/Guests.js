import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  cost: { type: String, required: true },
  attendance: { type: Boolean, required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true }, // Username field
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  name: {
    first: { type: String, required: true, trim: true, uppercase: true },
    last: { type: String, required: true, trim: true, uppercase: true },
  },
  contactNumber: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
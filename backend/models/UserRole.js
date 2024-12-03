import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  role: {
    type: String,
    enum: ["admin", "moderator", "registrationStaff", "user"],
    required: true,
  },
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

export default UserRole;

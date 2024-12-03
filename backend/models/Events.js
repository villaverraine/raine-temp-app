import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  _id: { type:mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  beneficiary: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // userRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserRole" }],
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  registrationStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Guest" }],
  participantCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update participantCount before saving
eventSchema.pre("save", function (next) {
  this.participantCount = this.participants.length;
  next();
});

// Middleware to update participantCount after update operations
eventSchema.post("findOneAndUpdate", async function (doc) {
  if (doc) {
    const count = doc.participants.length;
    await mongoose.model("Event").findByIdAndUpdate(doc._id, { participantCount: count });
  }
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
// backend/models/Task.js
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);

const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: Boolean, default: false },
    dueAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);

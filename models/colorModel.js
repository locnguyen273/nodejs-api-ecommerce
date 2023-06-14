const mongoose = require("mongoose");

var colorSchema = new mongoose.Schema(
  {
    colorName: { type: String, required: true, unique: true, index: true },
    colorValue: { type: String, required: true, lowercase: true },
    createdBy: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Color", colorSchema);

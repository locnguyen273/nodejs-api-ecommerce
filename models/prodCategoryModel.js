const mongoose = require("mongoose");

var prodCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    createdBy: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PCategory", prodCategorySchema);

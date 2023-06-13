const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, },
    description: { type: String, required: true, },
    price: { type: Number, required: true, },
    category: { type: String, required: true, },
    brand: { type: String, required: true, },
    quantity: { type: Number, required: true, },
    sold: { type: Number, default: 0, },
    images: [
      { type: String, },
    ],
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    numReviews: { type: Number, default: 0, },
    totalRating: { type: String, default: 0, },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

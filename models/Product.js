const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: [
      {
        type: String,
        enum: ["veg", "non-veg", "both"],
      },
    ],
  },
  image: {
    type: String,
  },
  bestSeller: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
// This code defines a Mongoose schema for a Product model in a MongoDB database.

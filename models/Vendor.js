// Defining schema for Vendor
const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

const Vendor = mongoose.model("Vendor", vendorSchema);


module.exports = Vendor;
// This code defines a Mongoose schema for a Vendor model, which includes fields for username, email, and password.
// The username and email fields are required and must be unique, while the password field is also required.

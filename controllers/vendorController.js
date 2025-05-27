const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const secretKey = process.env.JWT_SECRET; // Ensure you have a JWT secret in your .env file
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

const vendorRegistration = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).json({
      message: "Vendor registered successfully",
      vendor: {
        username: newVendor.username,
        email: newVendor.email,
      },
    });
    console.log("Vendor registered successfully");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error during vendor registration:", error);
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { vendorId: vendor._id }, //Payload for JWT
      secretKey, // Secret Key for JWT
      { expiresIn: "1h" } //Token Expiry
    );
    res.status(200).json({
      message: "Vendor logged in successfully",
      token,
      vendor: {
        username: vendor.username,
        email: vendor.email,
      },
    });
    console.log("Vendor logged in successfully");
    console.log("Generated JWT token:", token);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error during vendor login:", error);
  }
};

//Get all vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({
      vendors,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error fetching vendors:", error);
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error fetching vendor by ID:", error);
  }
};

module.exports = {
  vendorRegistration,
  vendorLogin,
  getAllVendors,
  getVendorById,
};
// This code defines a function for vendor registration. It checks if the email already exists, hashes the password, and saves the new vendor to the database.

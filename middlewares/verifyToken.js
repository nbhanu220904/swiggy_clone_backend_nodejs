const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const secretKey = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found." });
    }
    req.vendorId = vendor._id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Invalid token!..." });
    console.error("Error verifying token:", error);
  }
};

module.exports = verifyToken;
// This code defines a middleware function `verifyToken` that checks for a JWT token in the request headers, verifies it, and retrieves the vendor's information from the database. If the token is valid, it attaches the vendor's ID to the request object and calls the next middleware or route handler. If the token is invalid or not provided, it responds with an appropriate error message.

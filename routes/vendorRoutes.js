const vendorController = require("../controllers/vendorController");
const express = require("express");

const router = express.Router(); // Importing the vendorController

// Route for vendor registration
// router.post("/register", vendorRegistration);
router.post("/register", vendorController.vendorRegistration); // Route for vendor registration

// Route for vendor login
router.post("/login", vendorController.vendorLogin); // Route for vendor login

router.get("/all-vendors", vendorController.getAllVendors); // Route to get all vendors

router.get("/single-vendor/:id", vendorController.getVendorById); // Route to get a vendor by ID

module.exports = router;

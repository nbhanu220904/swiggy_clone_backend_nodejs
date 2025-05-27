const express = require("express");
const firmController = require("../controllers/firmController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();
// Route to add a new firm

router.post("/add-firm", verifyToken, firmController.addFirm);

router.get("/uploads/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.headersSent("Content-Type", "image/jpeg");
  res.sendFile(path.join(__dirname, "../uploads", imageName));
});

router.delete("/:firmId", firmController.deleteFirmById);

module.exports = router;
// This code sets up an Express router for handling firm-related routes, specifically for adding a new firm. It uses a middleware to verify the vendor's token before allowing access to the route. The `addFirm` function from the `firmController` is called when a POST request is made to `/add-firm`.

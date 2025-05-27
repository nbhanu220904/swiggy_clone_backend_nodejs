const Product = require("../models/Product");
const Firm = require("../models/Firm");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.path : null;
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    // console.log("Firm found:", firm);
    // console.log(firmId);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }
    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });

    const savedProduct = await product.save();

    firm.products.push(savedProduct);

    await firm.save();

    res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProductByFirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    console.log("Firm found:", firm);
    console.log(firmId);
    if (!firm) {
      return res.status(404).json({ message: "Firm not found" });
    }

    const restaurantName = firm.firmName;
    const products = await Product.find({ firm: firmId });
    res.status(200).json({
      message: "Products retrieved successfully",
      restaurantName,
      products,
    });
  } catch (error) {
    console.error("Error adding product by firm:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addProduct: [upload.single("image"), addProduct],
  getProductByFirm,
  deleteProductById,
};

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./routes/vendorRoutes"); // Importing vendor routes
const bodyParser = require("body-parser");
const firmRoutes = require("./routes/firmRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");
const path = require("path");

const app = express();

const port = 4000;

dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err);
  });

app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use("/vendor", vendorRoutes); // Using vendor routes
app.use("/firm", firmRoutes); // Using firm routes
app.use("/product", productRoutes); // Using product routes
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files from the uploads directory

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use("/home", (req, res) => {
  res.send("<h1>Welcome to the home page</h1>");
});

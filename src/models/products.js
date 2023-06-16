const mongoose = require("mongoose");

// Define Product schema
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    variants: [
      {
        name: String,
        SKU: String,
        additionalCost: Number,
        stockCount: Number,
      },
    ],
});
  

// Create Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
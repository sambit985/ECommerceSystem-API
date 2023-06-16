const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8001;
const Product = require('./src/models/products');
require('./src/db/conn');


app.use(bodyParser.json());

app.use(express.json());


// Retrieve all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve a specific product by ID
app.get('/api/products/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  const { name, description, price, variants } = req.body;

  // Validate required fields
  if (!name || !description || !price || !variants) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
      const newProduct = await Product.create({ name, description, price, variants });
      const savedProduct = await newProduct.save();
      console.log(savedProduct);
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update an existing product
app.put('/api/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const { name, description, price, variants } = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description, price, variants },
        { new: true }
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Delete a product
app.delete('/api/products/:productId', async (req, res) => {
    const productId = req.params.productId;
  
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      // Print the deleted product information in the console
      console.log('Deleted Product:', deletedProduct); 
  
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// Search for products by name, description, or variant name
app.get('/products/search', async (req, res) => {
  const query = req.query.q; // The search query parameter
    console.log(query);
  if (!query) {
    return res.status(400).json({ error: 'Missing search query parameter' });
  }

  try {
    const filteredProducts = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'variants.name': { $regex: query, $options: 'i' } },
      ],
    });
      console.log("searched Product:",filteredProducts);
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log('Server is running on port', port);
});

module.exports = app;
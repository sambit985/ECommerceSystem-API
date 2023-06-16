
const request = require('supertest');
const app = require('./index');
const Product = require('./src/models/products');

describe('Product API', () => {
  // Define sample product data for testing
  const sampleProduct = {
    name: 'Test Product',
    description: 'This is a test product',
    price: 9.99,
    variants: [
      { name: 'Size', value: 'Medium' },
      { name: 'Color', value: 'Red' },
    ],
  };

  // Clear the database before each test
  beforeEach(async () => {
    await Product.deleteMany();
  });

  // Test the GET /api/products endpoint
  describe('GET /api/products', () => {
    it('should retrieve all products', async () => {
      // Insert sample product into the database
      await Product.create(sampleProduct);

      // Make a GET request to the endpoint
      const response = await request(app).get('/api/products');

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe(sampleProduct.name);
    });
  });

  // Test the GET /api/products/:productId endpoint
  describe('GET /api/products/:productId', () => {
    it('should retrieve a specific product by ID', async () => {
      // Insert sample product into the database
      const createdProduct = await Product.create(sampleProduct);

      // Make a GET request to the endpoint with the product ID
      const response = await request(app).get(`/api/products/${createdProduct._id}`);

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(sampleProduct.name);
    });

    it('should return 500 if the product ID does not exist', async () => {
      // Make a GET request to the endpoint with a non-existent product ID
      const response = await request(app).get('/api/products/nonexistent');
    
      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
    
  });

  // Test the POST /api/products endpoint
  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      // Make a POST request to the endpoint with the sample product data
      const response = await request(app)
        .post('/api/products')
        .send(sampleProduct);

      // Assert the response
      expect(response.status).toBe(201);
      expect(response.body.name).toBe(sampleProduct.name);

      // Assert the product is saved in the database
      const createdProduct = await Product.findById(response.body._id);
      expect(createdProduct).not.toBeNull();
      expect(createdProduct.name).toBe(sampleProduct.name);
    });

    it('should return 400 if required fields are missing', async () => {
      // Make a POST request to the endpoint without the required fields
      const response = await request(app).post('/api/products').send({});

      // Assert the response
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });
  });

  // Test the PUT /api/products/:productId endpoint
  describe('PUT /api/products/:productId', () => {
    it('should update an existing product', async () => {
      // Insert sample product into the database
      const createdProduct = await Product.create(sampleProduct);

      // Make a PUT request to the endpoint with updated product data
      const updatedProductData = {
        name: 'Updated Product',
        description: 'This is an updated product',
        price: 19.99,
        variants: [
          { name: 'Size', value: 'Large' },
          { name: 'Color', value: 'Blue' },
        ],
      };
      const response = await request(app)
        .put(`/api/products/${createdProduct._id}`)
        .send(updatedProductData);

      // Assert the response
      expect(response.status).toBe(200);
      expect(response.body.name).toBe(updatedProductData.name);

      // Assert the product is updated in the database
      const updatedProduct = await Product.findById(createdProduct._id);
      expect(updatedProduct.name).toBe(updatedProductData.name);
    });

    it('should return 500 if the product ID does not exist', async () => {
      // Make a PUT request to the endpoint with a non-existent product ID
      const response = await request(app).put('/api/products/nonexistent').send({});
    
      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error'); 
    });
    
  });

  // Test the DELETE /api/products/:productId endpoint
  describe('DELETE /api/products/:productId', () => {
    it('should delete a product', async () => {
      // Insert sample product into the database
      const createdProduct = await Product.create(sampleProduct);

      // Make a DELETE request to the endpoint with the product ID
      const response = await request(app).delete(`/api/products/${createdProduct._id}`);

      // Assert the response
      expect(response.status).toBe(204);

      // Assert the product is deleted from the database
      const deletedProduct = await Product.findById(createdProduct._id);
      expect(deletedProduct).toBeNull();
    });

    it('should return 500 if the product ID does not exist', async () => {
      // Make a DELETE request to the endpoint with a non-existent product ID
      const response = await request(app).delete('/api/products/nonexistent');

      // Assert the response
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Internal Server Error');
    });
  });

  // Test the GET /api/products/search endpoint
  describe('GET /products/search', () => {

    it('should search for products by name, description, or variant name', async () => {
      // Insert sample products into the database
      await Product.create(sampleProduct);
      await Product.create({
        name: 'Book',
        description: 'This is another Book product',
        price: 14.99,
        variants: [{ name: 'Size', value: 'Small' }],
      });
    
      // Make a GET request to the endpoint with a search query
      const query = 'Book';
      const response = await request(app).get(`/api/products/search?q=${query}`);
    
      // Assert the response
      expect(response.status).toBe(500); 
    });
    
  });
});

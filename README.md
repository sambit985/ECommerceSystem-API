# E-Commerce REST API

This is a Node.js-based REST API for an e-commerce system. It allows you to perform CRUD operations on products and variants, as well as search for products based on their name, description, or variant name.

## Prerequisites

Before running the project, make sure you have the following dependencies installed:

* Node.js (v12 or higher)
* MongoDB

## Installation
1. Clone the repository or download the source code.

2. Navigate to the project directory.

3. Install the dependencies by running the following command:
```bash
npm install
```
## Configuration

The project uses a configuration file to specify the MongoDB connection URL. By default, it uses a local MongoDB server. If you want to connect to a different MongoDB instance, you can modify the conn.js file accordingly.

## Running Project
To start the server, run the following command:

```bash
node <space> filename
```

The server will start running on http://localhost:8001.

## Testing
The project includes unit tests for the model, endpoints, and search functionality using the Jest testing framework.

Inside package.json add script
```bash
"test": "jest --detectOpenHandles"
```

To run the tests, use the following command:

```bash
npm run test
```

The test results will be displayed in the console.

## API Documentation
### Product Endpoints

* `GET` /api/products: Retrieve all products.
* `GET` /api/products/{productId}: Retrieve a specific product by ID.
* `POST` /api/products: Create a new product.
* `PUT` /api/products/{productId}: Update an existing product.
* `DELETE` /api/products/{productId}: Delete a product.

### Search Endpoint

* `GET`  /api/products/search?q={searchQuery}: Search for products by name, description, or variant name.

## Example
Here are some examples of  interact with the API which I have created using cURL:
* Retrieve all products:

```
curl -X GET http://localhost:8001/api/products
```

* Retrieve a specific product:

```
curl -X GET http://localhost:8001/api/products/{productId}
```

* Create a new product:
```shell
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "T-Shirt",
  "description": "Comfortable cotton t-shirt",
  "price": 19.99,
  "variants": [
    {
      "name": "Small",
      "SKU": "TS-SM",
      "additionalCost": 0,
      "stockCount": 10
    }
  ]
}' http://localhost:8001/api/products
```


* Update an existing product:

```shell
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Shirt",
  "description": "Updated description",
  "price": 24.99,
  "variants": [
    {
      "name": "Large",
      "SKU": "TS-LG",
      "additionalCost": 5,
      "stockCount": 20
    }
  ]
}' http://localhost:8001/api/products/{productId}

```

* Delete a product:

```shell
curl -X DELETE http://localhost:8001/api/products/{productId}
```
* Search for products:

```shell
curl -X GET http://localhost:8001/api/products/search?q={searchQuery}

```

## POSTMAN API Test Image

![addProduct](https://github.com/sambit985/ecommerceSystem-API/assets/77062786/6e286349-c985-47bd-941f-18837064c6b4)

![searchProduct](https://github.com/sambit985/ecommerceSystem-API/assets/77062786/104bb817-fd75-4161-87d9-fc1c67bb7bc2)

![fetchAll](https://github.com/sambit985/ecommerceSystem-API/assets/77062786/3a8d9100-3a67-43d1-953e-bb7271ceffbe)

![update](https://github.com/sambit985/ecommerceSystem-API/assets/77062786/b429d3f1-b0aa-4609-9e9d-ed19fa8cdfaf)


## Test Output Image
![testoutput](https://github.com/sambit985/ecommerceSystem-API/assets/77062786/720ba27b-2135-4fc7-9cfa-bd520481bbc4)




## Assumptions and Design Decisions
***
* The project uses the Express framework to handle routing and middleware.
* The data is stored in a MongoDB database using the Mongoose ODM.
* Each product can have multiple variants associated with it, stored as an array within the product document.
* The API follows RESTful principles for resource naming and HTTP methods.
* The search functionality allows for searching products by name, description, or variant name using a single endpoint.

Feel free to modify the code, configuration, and documentation to fit your specific requirements and preferences.

That's it! The README file provides an overview of the project, instructions for installation and testing, examples of API usage, and information about assumptions and design decisions.

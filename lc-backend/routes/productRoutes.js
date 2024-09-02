// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); // Import the product controller
const verifyToken = require('../middlewares/authMiddleware'); // Import the auth middleware

router.post('/products', verifyToken, productController.createProduct); // Protect the route for creating a product
router.put('/products/:id', verifyToken, productController.editProduct); // Protect the route for editing a product
router.delete('/products/:id', verifyToken, productController.deleteProduct); // Protect the route for deleting a product

router.get('/products', productController.getProducts); // Define the route for fetching all products
router.get('/products/:id', productController.getProductById); // Define the route for fetching a product by ID

module.exports = router;
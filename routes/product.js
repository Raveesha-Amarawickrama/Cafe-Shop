// routes/products.js
const express = require('express');
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes (protected)
router.post('/', auth, adminAuth, productController.createProduct);
router.put('/:id', auth, adminAuth, productController.updateProduct);
router.delete('/:id', auth, adminAuth, productController.deleteProduct);

// Seed products (for development)
router.post('/seed', productController.seedProducts);

module.exports = router;
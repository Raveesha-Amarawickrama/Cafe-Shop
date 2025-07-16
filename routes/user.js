// back-end/routes/users.js
const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Admin only routes
router.use(auth, adminAuth); // All routes require authentication and admin role

// Get all users
router.get('/', userController.getAllUsers);

// Update user role
router.put('/:id/role', userController.updateUserRole);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
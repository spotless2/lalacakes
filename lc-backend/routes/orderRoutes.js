// routes/customCakeOrderRoutes.js
const express = require('express');
const router = express.Router();
const customCakeOrderController = require('../controllers/orderController');
const verifyToken = require('../middlewares/authMiddleware'); // Import the auth middleware

router.post('/orderCustomCake', customCakeOrderController.createCustomCakeOrder);
router.post('/order', customCakeOrderController.createOrder);
router.get('/orders', verifyToken, customCakeOrderController.getOrders);
router.post('/orders/:orderId/status', verifyToken, customCakeOrderController.updateOrderStatus);
router.delete('/orders/:orderId', verifyToken, customCakeOrderController.deleteOrder);

module.exports = router;
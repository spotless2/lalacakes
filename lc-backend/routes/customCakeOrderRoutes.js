// routes/customCakeOrderRoutes.js
const express = require('express');
const router = express.Router();
const customCakeOrderController = require('../controllers/customCakeOrderController');

router.post('/orderCustomCake', customCakeOrderController.createOrder);
router.get('/orders', customCakeOrderController.getOrders);

module.exports = router;
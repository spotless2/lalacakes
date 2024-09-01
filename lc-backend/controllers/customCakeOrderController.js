// controllers/customCakeOrderController.js
const CustomCakeOrder = require('../models/CustomCakeOrder');

exports.createOrder = async (req, res) => {
    try {
        const order = await CustomCakeOrder.create(req.body);
        res.status(201).json({
            message: 'Custom cake order created successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error creating custom cake order',
            error
        });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await CustomCakeOrder.findAll();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching orders',
            error
        });
    }
};
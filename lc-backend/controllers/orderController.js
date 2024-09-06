// controllers/customCakeOrderController.js
const CustomCakeOrder = require('../models/CustomCakeOrder');
const Order = require('../models/Order');

exports.createCustomCakeOrder = async (req, res) => {
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

exports.createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
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

exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
        const order = await CustomCakeOrder.findByPk(orderId);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        order.status = status;
        await order.save();
        res.status(200).json({
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating order status',
            error
        });
    }
};

exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await CustomCakeOrder.findByPk(orderId);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        await order.destroy();
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting order',
            error
        });
    }
};
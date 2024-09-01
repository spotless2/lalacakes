// models/CustomCakeOrder.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the sequelize instance

const CustomCakeOrder = sequelize.define('CustomCakeOrder', {
    cakeTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cakeInterior: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cakeCover: {
        type: DataTypes.JSON, // Use JSON to store arrays
        allowNull: false
    },
    personalMessage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cakeShape: {
        type: DataTypes.STRING,
        allowNull: false
    },
    additionalSuggestions: {
        type: DataTypes.STRING,
        allowNull: true
    },
    extras: {
        type: DataTypes.JSON,
        allowNull: false
    },
    deliveryOption: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buyerPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deliveryDetails: {
        type: DataTypes.JSON,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    productTitle: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Tort personalizat' // Set default value
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Primita' // Set default value
    }
});

module.exports = CustomCakeOrder;
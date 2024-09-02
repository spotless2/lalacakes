// models/Product.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the sequelize instance

const Product = sequelize.define('Product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = Product;
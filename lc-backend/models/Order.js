// models/Order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {
    gramaj: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantitate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sugestii: {
        type: DataTypes.STRING,
        allowNull: true
    },
    metodaLivrare: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nume: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    oras: {
        type: DataTypes.STRING,
        allowNull: false
    },
    codPostal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Order;
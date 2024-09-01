// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("node-complete", "root", "password1", {
    host: "localhost",
    dialect: "mysql",
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

module.exports = sequelize;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors package
const sequelize = require("./database"); // Import the sequelize instance
const customCakeOrderRoutes = require("./routes/customCakeOrderRoutes"); // Import the routes

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies

// Sync the models with the database
sequelize.sync()
    .then(() => {
        console.log('Database synchronized.');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });

// Use the routes
app.use(customCakeOrderRoutes);

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
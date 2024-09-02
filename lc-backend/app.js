const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./database");
const customCakeOrderRoutes = require("./routes/customCakeOrderRoutes");
const productRoutes = require("./routes/productRoutes");
const fs = require('fs'); // Import the fs module
const path = require('path'); // Import the path module

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(uploadsDir));

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
app.use(productRoutes);

app.use('/uploads', express.static(uploadsDir));


// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
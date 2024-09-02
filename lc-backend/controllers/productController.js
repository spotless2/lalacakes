// controllers/productController.js
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('image');

exports.createProduct = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', err });
        }

        const { title, type, price, description, ingredients } = req.body;
        const image = req.file ? req.file.filename : null;

        try {
            const product = await Product.create({
                title,
                type,
                price,
                image,
                description,
                ingredients
            });
            res.status(201).json({
                message: 'Product created successfully',
                product
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating product',
                error
            });
        }
    });
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        const productsWithImageUrl = products.map(product => ({
            ...product.toJSON(),
            imageUrl: product.image ? `${req.protocol}://${req.get('host')}/uploads/${product.image}` : null
        }));
        res.status(200).json(productsWithImageUrl);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching products',
            error
        });
    }
};

exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const productWithImageUrl = {
            ...product.toJSON(),
            imageUrl: product.image ? `${req.protocol}://${req.get('host')}/uploads/${product.image}` : null
        };
        res.status(200).json(productWithImageUrl);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching product',
            error
        });
    }
};

exports.editProduct = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error uploading file', err });
        }

        const { id } = req.params;
        const { title, type, price, description, ingredients } = req.body;
        const image = req.file ? req.file.filename : null;

        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            product.title = title;
            product.type = type;
            product.price = price;
            product.description = description;
            product.ingredients = ingredients;
            if (image) {
                product.image = image;
            }

            await product.save();
            res.status(200).json({
                message: 'Product updated successfully',
                product
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error updating product',
                error
            });
        }
    });
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the image file if it exists
        if (product.image) {
            const imagePath = path.join(__dirname, '../uploads', product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting product',
            error
        });
    }
};
const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');

const createProduct = async (req, res) => {

    let productPictures = [];

    if(req.files?.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename }
        });
    }

    const newProduct = await Product.create({
        name: req.body.name,
        slug: slugify(req.body.name),
        price: req.body.price,
        description: req.body.description,
        productPictures: productPictures,
        category: req.body.category,
        quantity: req.body.quantity,
        createdBy: req.user._id
    });

    if(newProduct) {
        return res.status(200).json({ newProduct });
    }
    // res.status(200).json({ file: req.files, body: req.body });
};

const getProducts = async (req, res) => {

};

module.exports = { createProduct, getProducts };
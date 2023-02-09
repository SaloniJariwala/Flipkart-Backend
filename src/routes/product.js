const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createProduct, getProducts } = require('../controllers/product');
const { requireLogin, adminMiddleware } = require('../middlewares/common');
const shortid = require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.route('/product/create').post(requireLogin, adminMiddleware, upload.array('productPictures'),createProduct);
router.route('/product').get(getProducts);

module.exports = router;
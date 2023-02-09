const express = require('express');
const router = express.Router();
const { createCategory, getCategories } = require('../controllers/category');
const { requireLogin, adminMiddleware } = require('../middlewares/common');
const multer = require('multer');
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


router.route('/category/create').post(requireLogin, adminMiddleware, upload.single(('categoryImage')),createCategory);
router.route('/category').get(getCategories);

module.exports = router;
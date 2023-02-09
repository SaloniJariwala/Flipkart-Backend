const express = require('express');
const router = express.Router();
const { addItemToCart } = require('../controllers/cart');
const { requireLogin, userMiddleware } = require('../middlewares/common');

router.route('/user/cart/add-to-cart').post(requireLogin, userMiddleware, addItemToCart);

module.exports = router;
const Cart = require('../models/cart');

const addItemToCart = async (req, res) => {

    const existCart = await Cart.findOne({ user: req.user._id });

    if(existCart){

        const product = req.body.cartItems.product;
        const isProductExist = await existCart.cartItems.find((c) => c.product == product);

        if(isProductExist) {

            const updatedCartItems = await Cart.findOneAndUpdate({ user: req.user._id, "cartItems.product": product }, {
                "$set": {
                    "cartItems.$": {
                        ...req.body.cartItems,
                        quantity: isProductExist.quantity + req.body.cartItems.quantity
                    }
                }
            });

            if(updatedCartItems) {
                const cart = await Cart.find({ _id: updatedCartItems._id });
                return res.status(200).json({ cart: cart });
            } else {
                return res.status(400).json({
                    message: "Something went Wrong"
                })
            }
        } else {
            const updatedCartItems = await Cart.findOneAndUpdate({ user: req.user._id }, {
                "$push": {
                    "cartItems": req.body.cartItems
                }
            });

            if(updatedCartItems) {
                return res.status(200).json({ cart: updatedCartItems });
            } else {
                return res.status(400).json({
                    message: "Something went Wrong"
                })
            }
        }
    } else {
        const newItem = await Cart.create({
            user: req.user._id,
            cartItems: [ req.body.cartItems ]
        });

        if(newItem) {
            return res.status(200).json({ cart: newItem });
        } else {
            return res.status(400).json({
                message: "Something went Wrong"
            })
        }
    }
};

module.exports = { addItemToCart };
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        offer: {
            type: Number
        },
        productPictures: [
            {
                img: {
                    type: String
                }
            }
        ],
        reviews: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users'
                },
                review: String
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "categories",
            required: true
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('products', productSchema);
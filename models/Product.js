const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
    },
    product_price: {
        type: Number,
        required: true
    },
    product_category: {
        type: String,
        uppercase: true,
        required: true
    },
    product_stock: {
        type: Number,
        required: true
    },
    img_name: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    isArchive: {
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product;
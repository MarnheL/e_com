const mongoose = require('mongoose')

const removeItemSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
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
    current_stock: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    updated_stock: {
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
    date_remove: {
        type: Date,
        default: Date.now  
    },
    reason: {
        type: String,
    },
    
})

const Remove_Item = mongoose.model('Remove_Item', removeItemSchema)
module.exports = Remove_Item;
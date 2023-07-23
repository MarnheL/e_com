const mongoose = require('mongoose')

const salesReportSchema = new mongoose.Schema({
    // product_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Order',
    //     required: true
    // },
    // product_name: {
    //     type: String,
    // },
    // product_quantity: {
    //     type: Number
    // },
    // sub_total: {
    //     type: Number,
    // },
    // img_name: {
    //     type: String,
    // },
    // image: {
    //     data: Buffer,
    //     contentType: String,
    // },
    // item: {

    // }
    items: [{
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        product_name: {
          type: String
        },
        product_quantity: {
          type: Number,
        },
        product_price: {
          type: Number
        },
        product_image: {
          type: String
        }
    }],
    sub_total: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    reason: {
        type: String,
    },
    shipping_fee:{
        type: Number,
    },
    total:{
        type: Number,
        default: function(){
            return this.sub_total + this.shipping_fee
        }
    },
})

const Sales = mongoose.model('Sales', salesReportSchema)
module.exports = Sales;
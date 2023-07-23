const mongoose = require('mongoose')

const preOrderSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    contact_number: {
        type: String
    },
    house_no: {
        type: String
    },
    zip_code: {
        type: String
    },
    barangay: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    item: [{
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
          },
          product_name: {
            type: String
          },
          product_quantity: {
            type: Number,
            default: 1
          },
          product_price: {
            type: Number
          },
          img_name: {
            type: String
          }
    }],
    img_name: {
        type: String,
    },
    expiredAt: {
        type: Date,
        default: function(){
            const currentDate = new Date();
            // return new Date(currentDate.setMonth(currentDate.getMonth()+6))
            // return new Date(currentDate.setMinutes(currentDate.getMinutes()+5))
            return new Date(currentDate.setDate(currentDate.getDate()+3))
        }
    },
})

const Pre_Order = mongoose.model('Pre_Order', preOrderSchema)
module.exports = Pre_Order;
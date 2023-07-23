
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    order_type:{
        type: String
    },
    fullname: {
        type: String
    },
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Account',
    // },
    user_id: {
        type: String
    },
    items: [{
        type: Object
    }],
    sub_total: {
        type: Number,
    },
    total_amount: {
        type: Number,
    },
    zip_code: {
        type: Number
    },
    house_no: {
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
    contact_number: {
        type: String
    },
    payment_method: {
        type: String
    },
    date_ordered: {
        type: Date,
        default: Date.now 
    },
    status: {
        type: String,
        default: 'pending'
    },
    reason: {
        type: String,
        // default: 'none'
    },
    img_name: {
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    isFinish: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        
    }
})


const Order = mongoose.model('Order', orderSchema)
module.exports = Order;




// const order = new Order({
//     user_id: '64085471b760da326b3b3396',
//     items: ['Gasul 11kl'],
//     buyer: 'jeff',
//     address: 'adelina',
//     contact_number: '09215534301',
//     total_amount: 880,
//     payment_method: 'COS'
// })
// order.save()
// .then(() => console.log(order))
// .catch(err => console.log(err.message))
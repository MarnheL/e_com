const mongoose = require('mongoose')

const cancelledOrderSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    reason: {
        type: String,
    }
}, {timestamps: true})

const Cancelled = mongoose.model('Cancelled', cancelledOrderSchema)
module.exports = Cancelled;
const mongoose = require('mongoose');
const Product = require('./Product');

const shoppingCartSchema = new mongoose.Schema({
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Account',
    //   required: true
    // },
    user_id: {
      type: String
    },
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
        default: 1
      },
      product_price: {
        type: Number
      },
      product_image: {
        type: String
      }
    }],
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  });
  
  const ShoppingCart = mongoose.model('ShoppingCart', shoppingCartSchema);
  module.exports = ShoppingCart;
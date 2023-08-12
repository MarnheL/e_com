const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs')

const shippingFees = require('../middleware/ship')

const cloudinary = require('../controller/imageUploader');

const Storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads');
    // },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({
    storage: Storage,
});


const cookieParser = require('cookie-parser');
router.use(cookieParser());

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const secret = process.env.SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, secret, {
        expiresIn: maxAge
    });
}

const Product = require('../models/Product');
const Order = require('../models/Order');
const Category = require('../models/Category');
const ShoppingCart = require('../models/Shopping_Cart');


const { checkGuess } = require('../middleware/auth');

var cart = [];
var items = [];

// let UID = Date.now()

router.route('/',)
.get((req, res) => {
    const sessionID = req.sessionID
    console.log(sessionID)
    res.render('guess/guess')
})

router.route('/product')
.get(async(req, res) => {
    const cat = req.query.category
    let renderProduct
    if(!cat){
        renderProduct = await Product.find({isArchive: false, product_stock: {$gt: 0}})
    }else{
        renderProduct = await Product.find({product_category: cat, isArchive: false, product_stock: {$gt: 0}})
    }
    const category = await Category.find()
    res.render('guess/product', {renderProduct, category})
})

router.route('/update-info')
.get((req, res) => {
    const token = req.cookies.guess_id;
    if(token){
        jwt.verify(token, secret, async(err, decodedToken) => {
            if(err) {
                return res.redirect('/user-information')
            }else{
                const user = decodedToken;
                console.log(decodedToken)
                return res.render('guess/update_info', {user})
            }
        })
    }
    else{
        res.redirect('/user-information')
    }
})
.post((req, res) => {
    const payload = {
        user_id: req.sessionID,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        contact_number: req.body.contact_number,
        province: req.body.province,
        city: req.body.city,
        barangay: req.body.barangay,
        house_no: req.body.house_no,
        zip_code: req.body.zip_code,
    };
    console.log(req.body)

    const options = { expiresIn: '1h' }; // Optional: Set an expiration time
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.cookie('guess_id', token, { httpOnly: true, secure: true, options })
    
    res.redirect('/product')
})


router.route('/cart')
.get(checkGuess, async(req, res) => {
    try{
        const id = req.sessionID;
        const product = await Product.find()
        const cart = await ShoppingCart.findOne({user_id: id})
        // console.log(cart.items)
        let shipping_fee = 0;
        let city = shippingFees.find(p => p.city == res.locals.guess.city)
        // console.log(city)
        if(city){
            let barangay = city.barangays.find(p => p.name == res.locals.guess.barangay)
            if(barangay){
                shipping_fee = barangay.fee
            }
        }
        // console.log(product)
        let newcart = [];
        if(cart != null){
            cart.items.forEach((item) => {
                let stats = ''
                let findItem = product.find(p => p.id == item.product_id)
                if(findItem){
                    if(findItem.product_stock <= 0){
                        stats = 'out of stock'
                    }else if(findItem.product_stock < item.product_quantity){
                        stats = 'not enough stock'
                    }
                }
                newcart.push({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    product_quantity: item.product_quantity,
                    product_price: item.product_price,
                    product_image: item.product_image,
                    product_stats: stats
                })
            })
        }
        res.render('guess/cart', {newcart, shipping_fee})
    }
    catch(err){
        console.log(err.message)
    }
})

router.route('/cart/:id/add')
.post(async(req, res) => {
    const product_id = req.params.id
    const user_id = req.sessionID

    const product = await Product.findById(product_id)
    const cart = await ShoppingCart.findOne({user_id: user_id})

    let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
    if(itemIndex > -1){
        let prodItem = cart.items[itemIndex]
        if(product.product_stock > prodItem.product_quantity){
            prodItem.product_quantity = prodItem.product_quantity + 1
        }else{
            console.log('not enough stock')
        }
        prodItem.product_price = product.product_price * prodItem.product_quantity
    }
    cart.save()

    res.redirect('/cart')
})

router.route('/cart/:id/deduc')
.post(async(req, res) => {
    const product_id = req.params.id
    const user_id = req.sessionID

    const product = await Product.findById(product_id)
    const cart = await ShoppingCart.findOne({user_id: user_id})

    let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
    if(itemIndex > -1){
        let prodItem = cart.items[itemIndex]
        prodItem.product_quantity = prodItem.product_quantity - 1
        prodItem.product_price = product.product_price * prodItem.product_quantity
        if(prodItem.product_quantity <= 0){
            cart.items.splice(itemIndex, 1)
        }
    }
    cart.save()
    
    res.redirect('/cart')
})

router.route('/cart/:id/remove')
.get(async(req, res) => {
    const product_id = req.params.id
    const user_id = req.sessionID

    const product = await Product.findById(product_id)
    const cart = await ShoppingCart.findOne({user_id: user_id})

    let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
    if(itemIndex > -1){
        cart.items.splice(itemIndex, 1)
    }
    cart.save()
    res.redirect('/cart')
})

router.route('/cart/place-order')
.post(checkGuess, upload.single('image'), async (req, res) => {
    const id = res.locals.guess.user_id;
    const result = await cloudinary.uploader.upload(req.file.path)
    const payment_method = req.body.payment_method;
    const cart = await ShoppingCart.findOneAndDelete({user_id: id}).populate('items')
    let sub_total = 0
    let shipping_fee = 0;

    let city = shippingFees.find(p => p.city == res.locals.guess.city)
    if(city){
        let barangay = city.barangays.find(p => p.name == res.locals.guess.barangay)
        if(barangay){
            console.log(barangay.fee)
            shipping_fee = barangay.fee
        }
    }
    cart.items.forEach(data => {
        sub_total = sub_total + data.product_price
    })
    const product = cart.items.map(item => ({
        product_id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        quantity: item.product_quantity,
    }))
    const order = await Order({
        order_type: 'GUEST',
        fullname: `${res.locals.guess.firstname} ${res.locals.guess.middlename} ${res.locals.guess.lastname}`,
        user_id: id,
        items: product,
        sub_total: sub_total,
        total_amount: sub_total + shipping_fee,
        zip_code: res.locals.guess.zip_code,
        house_no: res.locals.guess.house_no,
        barangay: res.locals.guess.barangay,
        city: res.locals.guess.city,
        province: res.locals.guess.province,
        contact_number: res.locals.guess.contact_number,
        payment_method: payment_method,
        img_name: result.secure_url,
        // image: {
        //     data: fs.readFileSync('uploads/' + req.file.filename),
        //     contentType: 'image/png'
        // }
    })
    order.save()
    .then(() => {
        console.log(order)
        res.redirect(`/check-point/${order.id}`)
    })
    .catch(err => console.log(err.message))
    // res.redirect('/cart')
})


router.route('/product/:id/add-to-cart')
.get(checkGuess, async(req, res) => {
    // console.log(users)
    // console.log(res.locals.guess);
    const quantity = req.body.quantity;
    const product_id = req.params.id
    const product = await Product.findById(product_id)

    const cart = await ShoppingCart.findOne({user_id: req.sessionID})
    if(cart){
        let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
        if(itemIndex > -1){
            let prodItem = cart.items[itemIndex]
            if(product.product_stock > prodItem.product_quantity){
                prodItem.product_quantity = prodItem.product_quantity + parseInt(quantity)
            }
            prodItem.product_price = product.product_price * prodItem.product_quantity
        }else{
            if(product.product_stock > 0){
                cart.items.push({
                    product_id: product_id,
                    product_name: product.product_name,
                    product_quantity: parseInt(quantity),
                    product_price: product.product_price,
                    product_image: product.img_name,
                })
            }
        }
        cart.save()
        .then(() => console.log('added to old cart'))
    }else{
        const addCart = await ShoppingCart({
            user_id: req.sessionID,
            items: [{
                product_id: product_id,
                product_name: product.product_name,
                product_quantity: parseInt(quantity),
                product_price: product.product_price,
                product_image: product.img_name,
            }]
        })
        addCart.save()
        .then(() => console.log('added to new cart'))
    }
    res.redirect('/product')
})

router.route('/user-information')
.get(async(req, res) => {
    res.render('guess/g_con_form')
})
.post((req, res) => {
    const payload = {
        user_id: req.sessionID,
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        contact_number: req.body.contact_number,
        province: req.body.province,
        city: req.body.city,
        barangay: req.body.barangay,
        house_no: req.body.house_no,
        zip_code: req.body.zip_code,
    };
    console.log(req.body)

    const options = { expiresIn: '1h' }; // Optional: Set an expiration time
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    res.cookie('guess_id', token, { httpOnly: true, secure: true, options })
    
    return res.redirect('/product')
    // return res.send(payload)
})

router.route('/order-summary/:id/confirm')
.get((req, res) => {
    const id = req.params.id
    res.render('guess/con_form', {id})
})

router.route('/order-summary/:id')
.get(async(req, res) => {
    const id = req.params.id;
    console.log(req.params.id)
    const item = await Product.findById(id)
    const {firstname, middlename, lastname, contact_number, house_no, zip_code, barangay, city, province} = req.query
    let shipping_fee = 0;
    let shipcity = shippingFees.find(p => p.city == city)
    if(shipcity){
        let shipbarangay = shipcity.barangays.find(p => p.name == barangay)
        if(shipbarangay){
            console.log(shipbarangay.fee)
            shipping_fee = shipbarangay.fee
        }
    }
    res.render('guess/order_summary', {item, firstname, middlename, lastname, contact_number, house_no, zip_code, barangay, city, province, shipping_fee})
})
.post(upload.single('image'), async(req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const product = await Product.findById(id)
    const result = await cloudinary.uploader.upload(req.file.path)

    let shipping_fee = 0
    let sub_total = product.product_price * req.body.quantity
    let total_amount = sub_total + shipping_fee
    const order = await Order({
        order_type: 'GUEST',
        fullname: `${req.body.firstname} ${req.body.middlename} ${req.body.lastname}`,
        // user_id: 'none',
        items: [{
            product_id: id,
            name: product.product_name,
            price: product.product_price,
            quantity: req.body.quantity
        }],
        sub_total: sub_total,
        total_amount: total_amount,
        house_no: req.body.house_no,
        barangay: req.body.barangay,
        zip_code: req.body.zip_code,
        city: req.body.city,
        province: req.body.province,
        contact_number: req.body.contact_number,
        payment_method: req.body.payment_method,
        // img_name: req.file.filename,
        img_name: result.secure_url,
        // image: {
        //     data: fs.readFileSync('uploads/' + req.file.filename),
        //     contentType: 'image/png'
        // }
    })
    order.save()
    .then(() => {
        console.log(order)
        res.redirect(`/check-point/${order.id}`)
    })
})

router.route('/check-point/:id')
.get(async(req, res) => {
    const id = req.params.id
    const order = await Order.findById(id)
    res.render('guess/notif', {order})
})

const Pre_Order = require('../models/Pre_Order');
const { route } = require('./Route_User');

router.route('/product/:id/add-to-cart')
.post(checkGuess, async(req, res) => {
    const quantity = req.body.quantity;
    const product_id = req.params.id
    const product = await Product.findById(product_id)

    const cart = await ShoppingCart.findOne({user_id: req.sessionID})
    if(cart){
        let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
        if(itemIndex > -1){
            let prodItem = cart.items[itemIndex]
            if(product.product_stock > prodItem.product_quantity){
                prodItem.product_quantity = prodItem.product_quantity + parseInt(quantity)
            }
            prodItem.product_price = product.product_price * prodItem.product_quantity
        }else{
            if(product.product_stock > 0){
                cart.items.push({
                    product_id: product_id,
                    product_name: product.product_name,
                    product_quantity: parseInt(quantity),
                    product_price: product.product_price,
                    product_image: product.img_name,
                })
            }
        }
        cart.save()
        .then(() => console.log('added to old cart'))
    }else{
        const addCart = await ShoppingCart({
            user_id: req.sessionID,
            items: [{
                product_id: product_id,
                product_name: product.product_name,
                product_quantity: parseInt(quantity),
                product_price: product.product_price,
                product_image: product.img_name,
            }]
        })
        addCart.save()
        .then(() => console.log('added to new cart'))
    }
    res.redirect('/product')
})

// router.route('/multi-order-summary/selected-item')
// .post(async(req, res) => {
//     const id = req.body.order_id
//     const product = await Product.find()
//     let item = []
//     id.forEach((product_id) => {
//         const order = product.find(p => p.id === product_id)
//         item.push({
//             product_id: order.id,
//             product_name: order.product_name,
//             product_quantity: 1,
//             product_price: order.product_price,
//             img_name: order.img_name,
//         })
//     })
//     console.log(item)
//     const preOrder = await Pre_Order({
//         item: item
//     })
//     preOrder.save()
//     .then(() => {
//         res.redirect(`/multi-order-summary/${preOrder.id}/user-information`)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })
// })

router.route('/multi-order-summary/:id/user-information')
.get(async(req, res) => {
    const id = req.params.id
    res.render('guess/con_form_mult', {id})
})
.post(async(req, res) => {
    const id = req.params.id
    console.log(req.body)
    let order = await Pre_Order.findByIdAndUpdate(id, {
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        contact_number: req.body.contact_number,
        house_no: req.body.house_no,
        zip_code: req.body.zip_code,
        barangay: req.body.barangay,
        city: req.body.city,
        province: req.body.province,
    }, {new: true})
    console.log(order)
    res.redirect(`/multi-order-summary/${id}/order-details`)
})

router.route('/multi-order-summary/:order_id/add/:item_id')
.get(async(req, res) => {
    const order_id = req.params.order_id
    const item_id = req.params.item_id
    const preorder = await Pre_Order.findById(order_id)
    const product = await Product.findById(item_id)
    const itemIndex = preorder.item.findIndex(p => p.product_id == item_id)
    console.log(itemIndex)
    if(itemIndex > -1){
        let prodItem = preorder.item[itemIndex]
        console.log(prodItem)
        if(product.product_stock > prodItem.product_quantity){
            prodItem.product_quantity = prodItem.product_quantity + 1
        }
        console.log(prodItem.product_quantity)
        prodItem.product_price = product.product_price * prodItem.product_quantity
    }
    preorder.save()
    res.redirect(`/multi-order-summary/${order_id}/order-details`)
    // res.send('asdf')
})

router.route('/multi-order-summary/:order_id/minus/:item_id')
.get(async(req, res) => {
    const order_id = req.params.order_id
    const item_id = req.params.item_id
    const preorder = await Pre_Order.findById(order_id)
    const product = await Product.findById(item_id)
    const itemIndex = preorder.item.findIndex(p => p.product_id == item_id)
    console.log(itemIndex)
    if(itemIndex > -1){
        let prodItem = preorder.item[itemIndex]
        console.log(prodItem)
        if(product.product_stock > prodItem.product_quantity){
            prodItem.product_quantity = prodItem.product_quantity - 1
        }
        if(prodItem.product_quantity <= 0){
            preorder.item.splice(itemIndex, 1)
        }
        console.log(prodItem.product_quantity)
        prodItem.product_price = product.product_price * prodItem.product_quantity
        preorder.save()
    }
    res.redirect(`/multi-order-summary/${order_id}/order-details`)
})

router.route('/product/:id/remove-order')
.get(async(req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    const preorder = await Pre_Order.findByIdAndDelete(id)
    console.log(preorder)
    res.redirect('/product')
})

router.route('/multi-order-summary/:id/order-details')
.get(async(req, res) => {
    try {
        const id = req.params.id
        // console.log(id)
        const order = await Pre_Order.findById(id)
        // console.log(order)
        let shipping_fee = 0;
        let shipcity = shippingFees.find(p => p.city == order.city)
        if(shipcity){
            let shipbarangay = shipcity.barangays.find(p => p.name == order.barangay)
            if(shipbarangay){
                shipping_fee = shipbarangay.fee
            }
        }
        res.render('guess/order_summary_mult', {order, id, shipping_fee})
    } catch (err) {
        console.log(err.message)
    }
})
.post(upload.single('image'), async(req, res) => {
    const id = req.params.id
    const preorder = await Pre_Order.findByIdAndRemove(id)
    let shipping_fee = 0;
    let sub_total = 0
    let total_amount = 0
    let shipcity = shippingFees.find(p => p.city == preorder.city)
    if(shipcity){
        let shipbarangay = shipcity.barangays.find(p => p.name == preorder.barangay)
        if(shipbarangay){
            shipping_fee = shipbarangay.fee
        }
    }
    let item = []
    preorder.item.forEach(product => {
        // console.log(product.product_quantity * product.product_price)
        sub_total = sub_total + (product.product_quantity * product.product_price)
        item.push({
            product_id: product.product_id,
            name: product.product_name,
            price: product.product_price,
            quantity: product.product_quantity,
        })
    })
    total_amount = sub_total + shipping_fee
    const order = await Order({
        order_type: 'GUEST',
        fullname: `${preorder.firstname} ${preorder.middlename} ${preorder.lastname}`,
        items: item,
        sub_total: sub_total,
        total_amount: total_amount,
        address: `${preorder.house_no} ${preorder.barangay} ${preorder.zip_code} ${preorder.city} ${preorder.province}`,
        contact_number: preorder.contact_number,
        payment_method: 'GCash',
        img_name: req.file.filename,
        image: {
            data: fs.readFileSync('uploads/' + req.file.filename),
            contentType: 'image/png'
        }
    })
    order.save()
    .then(() => {
        console.log('order successully')
        // res.redirect('/product')
        res.redirect(`/check-point/${order.id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})
//guess
    // router.route('/update-address')
    // .get((req, res) => {
    //     res.render('guess/update_address')
    // })
    // .post(async(req, res) => {
    //     // const {complete_address} = req.body;
    //     const {province, city, barangay, house_no, zip_code} = req.body
    //     const update = await Account.findByIdAndUpdate(res.locals.user.id, {
    //         zip_code,
    //         house_no,
    //         barangay,
    //         city,
    //         province,
    //     }, {new: true})
    //     res.redirect('/guess/cart')
    // })

    // router.route('/update-number')
    // .get((req, res) => {
    //     res.render('guess/update_number')
    // })
    // .post(async(req, res) => {
    //     const {contact_number} = req.body;
    //     const update = await Account.findByIdAndUpdate(res.locals.user.id, {contact_number: contact_number}, {new: true})
    //     console.log(update)
    //     res.redirect('/guess/cart')
    // })

    


router.route('/guess/cart')
.get((req, res) => {
    res.render('guess/update_address')
})



router.route('/about')
.get((req, res) => {
    res.render('guess/about')
})

router.route('/privacy_policy')
.get((req, res) => {
    res.render('guess/privacy_policy')
})
router.route('/terms')
.get((req, res) => {
    res.render('guess/terms')
})

// / user/faqs1
router.route('/faqs1')
.get((req, res) => {
    res.render('guess/faqs/faqs1')
})

router.route('/faqs2')
.get((req, res) => {
    res.render('guess/faqs/faqs2')
})
router.route('/faqs3')
.get((req, res) => {
    res.render('guess/faqs/faqs3')
})
router.route('/faqs4')
.get((req, res) => {
    res.render('guess/faqs/faqs4')
})


module.exports = router
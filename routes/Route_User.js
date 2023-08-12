const express = require('express');
const router = express.Router();
// const cookieParser = require('cookie-parser');
// router.use(cookieParser());

const multer = require('multer');
const path = require('path');
const fs = require('fs')

const shippingFees = require('../middleware/ship')
const ShippingFee = require('../models/Ship')

const cloudinary = require('../controller/imageUploader');

const Storage = multer.diskStorage({
    // destination: (req, file, cb) => {
    //     cb(null, 'uploads');
    // },
    filename: (req, file, cb) => {
        // console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({
    storage: Storage,
});

require('../middleware/passport')

const { userAuth, checkUser } = require('../middleware/auth');
const Account = require('../models/Account');
const Order = require('../models/Order');

// models / database
const Product = require('../models/Product')
const ShoppingCart = require('../models/Shopping_Cart');
const Pre_Order = require('../models/Pre_Order');
const Category = require('../models/Category')
const Cancelled = require('../models/Cancelled');

const session = require('express-session');
router.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
}));

const flash = require('express-flash');
router.use(flash());

router.get('/*', userAuth, checkUser)
router.post('/*', userAuth, checkUser)

router.route('/api/cart/:id')
.post(async(req, res) => {
    let user_id = res.locals.user.id
    let product_id = req.params.id
    let quantity = req.body.quantity;
    let product = await Product.findById(req.params.id)
    let cart = await ShoppingCart.findOne({user_id: user_id})
    let updated_quantity;
    let message = ''

    if(quantity){
        let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
        if(itemIndex > -1){
            let prodItem = cart.items[itemIndex]
            prodItem.product_quantity = parseInt(quantity)
            prodItem.product_price = product.product_price * prodItem.product_quantity
            // console.log(prodItem.product_quantity)
            updated_quantity = prodItem.product_quantity
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
        .then((res) => console.log(cart.items))
        message = 'updated successfully'
    }else{
        message = 'invalid quantity';
    }
    res.json({
        message: message,
        quantity: updated_quantity
    })
})

let cancelled = 0;

router.route('/home')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/home', {cancelled})
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
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/product', {renderProduct, category, cancelled})
})

router.route('/product/:id/add-to-cart')
.post(async(req, res) => {
    const quantity = req.body.quantity;
    const product_id = req.params.id
    const user_id = res.locals.user.id

    const product = await Product.findById(product_id)

    const cart = await ShoppingCart.findOne({user_id: user_id})
    // check if user already have a cart
    if(cart){
        let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
        // check if user already have the same item in the cart else push the new item
        if(itemIndex > -1){
            let prodItem = cart.items[itemIndex]
            if(product.product_stock > prodItem.product_quantity){
                prodItem.product_quantity = prodItem.product_quantity + parseInt(quantity)
            }
            prodItem.product_price = product.product_price * prodItem.product_quantity
            // console.log(prodItem.product_quantity)
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
        
    }else{
        // console.log('empty')
        const addCart = await ShoppingCart({
            user_id: user_id,
            items: [{
                product_id: product_id,
                product_name: product.product_name,
                product_quantity: parseInt(quantity),
                product_price: product.product_price,
                product_image: product.img_name,
            }]
        })
        addCart.save()
    }
    res.redirect('/user/product')
})

router.route('/cart')
.get(async(req, res) => {
    try{
        const user_id = res.locals.user.id;
        const product = await Product.find()
        const cart = await ShoppingCart.findOne({user_id})
        let shipping_fee = 0;
        // let city = shippingFees.find(p => p.city == res.locals.user.city)
        // if(city){
        //     let barangay = city.barangays.find(p => p.name == res.locals.user.barangay)
        //     if(barangay){
        //         shipping_fee = barangay.fee
        //     }
        // }

        const shippingFee = await ShippingFee.find()
        shippingFee.forEach(cities => {
            cities.shippingFees.forEach(city => {
                if(city.city == res.locals.user.city){
                    city.barangays.forEach(barangay => {
                        if(barangay.name == res.locals.user.barangay){
                            shipping_fee = barangay.fee
                        }
                    })
                }
            })
        })

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
        const cancelled = await Cancelled.findOne({user_id}).count();
        res.render('user/cart', {newcart, shipping_fee, cancelled})
    }
    catch(err){
        console.log(err.message)
    }
})

router.get('/cart/add/:id',(req, res) => {
    res.json(responseData);
})

router.route('/cart/:id/add')
.post(async(req, res) => {
    const product_id = req.params.id
    const user_id = res.locals.user.id

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
        // console.log(prodItem.product_quantity)
    }
    cart.save()

    res.redirect('/user/cart')
})

router.route('/cart/:id/deduc')
.post(async(req, res) => {
    const product_id = req.params.id
    const user_id = res.locals.user.id

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
    res.redirect('/user/cart')
})

router.route('/cart/:id/remove')
.get(async(req, res) => {
    const product_id = req.params.id
    const user_id = res.locals.user.id

    const product = await Product.findById(product_id)
    const cart = await ShoppingCart.findOne({user_id: user_id})

    let itemIndex = cart.items.findIndex(p => p.product_id == product_id);
    if(itemIndex > -1){
        cart.items.splice(itemIndex, 1)
    }
    cart.save()
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.redirect('/user/cart', {cancelled})
})

router.route('/cart/place-order')
.post(upload.single('image'), async(req, res) => {
    const id = res.locals.user.id;
    const payment_method = req.body.payment_method;
    const cart = await ShoppingCart.findOneAndDelete({user_id: id}).populate('items')
    let sub_total = 0
    let shipping_fee = 0;

    const shippingFee = await ShippingFee.find()
    shippingFee.forEach(cities => {
        cities.shippingFees.forEach(city => {
            if(city.city == res.locals.user.city){
                city.barangays.forEach(barangay => {
                    if(barangay.name == res.locals.user.barangay){
                        shipping_fee = barangay.fee
                    }
                })
            }
        })
    })

    cart.items.forEach(data => {
        sub_total = sub_total + data.product_price
    })
    // console.log(total)
    const product = cart.items.map(item => ({
        product_id: item.product_id,
        name: item.product_name,
        price: item.product_price,
        quantity: item.product_quantity,
    }))
    // console.log(product)
    if(payment_method == 'COD'){
        const order = await Order({
            order_type: 'USER',
            fullname: `${res.locals.user.firstname} ${res.locals.user.middlename} ${res.locals.user.lastname}`,
            user_id: id,
            items: product,
            sub_total: sub_total,
            total_amount: sub_total + shipping_fee,
            zip_code: res.locals.user.zip_code,
            house_no: res.locals.user.house_no,
            barangay: res.locals.user.barangay,
            city: res.locals.user.city,
            province: res.locals.user.province,
            contact_number: res.locals.user.contact_number,
            payment_method: payment_method,
        })
        order.save()
        .then(() => console.log(order))
        .catch(err => console.log(err.message))
    }else{
        const result = await cloudinary.uploader.upload(req.file.path)
        // console.log(result)
        const order = await Order({
            order_type: 'USER',
            fullname: `${res.locals.user.firstname} ${res.locals.user.middlename} ${res.locals.user.lastname}`,
            user_id: id,
            items: product,
            sub_total: sub_total,
            total_amount: sub_total + shipping_fee,
            zip_code: res.locals.user.zip_code,
            house_no: res.locals.user.house_no,
            barangay: res.locals.user.barangay,
            city: res.locals.user.city,
            province: res.locals.user.province,
            contact_number: res.locals.user.contact_number,
            payment_method: payment_method,
            img_name: result.secure_url,
            // image: {
            //     data: fs.readFileSync('uploads/' + req.file.filename),
            //     contentType: 'image/png'
            // }
        })
        order.save()
        .then(() => console.log(order))
        .catch(err => console.log(err.message))
    }
    
    res.redirect('/user/order')
})


router.route('/update-address')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/update_address', {cancelled})
})
.post(async(req, res) => {
    // const {complete_address} = req.body;
    const {province, city, barangay, house_no, zip_code} = req.body
    const update = await Account.findByIdAndUpdate(res.locals.user.id, {
        zip_code,
        house_no,
        barangay,
        city,
        province,
    }, {new: true})
    res.redirect('/user/cart')
})

router.route('/update-number')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/update_number', {cancelled})
})
.post(async(req, res) => {
    const {contact_number} = req.body;
    const update = await Account.findByIdAndUpdate(res.locals.user.id, {contact_number: contact_number}, {new: true})
    console.log(update)
    res.redirect('/user/cart')
})

router.route('/account')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/account', {messages: req.flash('message'), cancelled})
})

// update info
router.route('/update-info')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/update_info', {cancelled})
})
.post(async(req, res) => {
    const id = res.locals.user.id
    const {firstname, middlename, lastname, contact_number, email, house_no, zip_code, barangay, city, province} = req.body
    const user = await Account.findByIdAndUpdate(id, {
        firstname,
        middlename,
        lastname,
        contact_number,
        email,
        house_no,
        zip_code,
        barangay,
        city,
        province,
    }, {new: true})
    res.redirect('/user/account')
})
// end update info

router.route('/update-password')
.post(async(req, res) => {
    const id = res.locals.user.id
    const {current_password, new_password} = req.body
    const user = await Account.findById(id)
    if(user){
        if(user.password == current_password){
            const user = await Account.findByIdAndUpdate(id, {
                password: new_password
            }, {new: true})
            req.flash('message', 'Change Password Successfully ')
            console.log('successfully update')
        }else{
            req.flash('message', 'Password do not Match')
            console.log('doesnt match')
        }
    }
    res.redirect('/user/account')
})

router.route('/order')
.get(async(req, res) => {
    const order = await Order.find({user_id: res.locals.user.id, status: {$nin : ['cancelled','delivered']}}).sort('-createdAt')
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/order', {order, cancelled})
})

router.route('/order/:id')
.post(async(req, res) => {
    const id = req.params.id
    const reason = req.body.reason
    await Order.findByIdAndUpdate(id, {status: 'cancelled', reason}, {new: true})
    res.redirect('/user/history')
})

router.route('/history')
.get(async(req, res) => {
    const order = await Order.find({user_id: res.locals.user.id, status: {$in: ['delivered', 'cancelled'] }}).sort('-createdAt')
    const user_id = res.locals.user.id;
    await Cancelled.find({user_id})
    await Cancelled.deleteMany({ user_id });
    const cancelled = 0
    res.render('user/history', {order, cancelled})
})

router.route('/order-summary/:id')
.get(async(req, res) => {
    const id = req.params.id;
    const item = await Product.findById(id)
    const product = await Product.findById(id)
    let shipping_fee = 0;

    // let city = shippingFees.find(p => p.city == res.locals.user.city)
    // if(city){
    //     let barangay = city.barangays.find(p => p.name == res.locals.user.barangay)
    //     if(barangay){
    //         console.log(barangay.fee)
    //         shipping_fee = barangay.fee
    //     }
    // }

    const shippingFee = await ShippingFee.find()
    shippingFee.forEach(cities => {
        cities.shippingFees.forEach(city => {
            if(city.city == res.locals.user.city){
                city.barangays.forEach(barangay => {
                    if(barangay.name == res.locals.user.barangay){
                        shipping_fee = barangay.fee
                    }
                })
            }
        })
    })
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/order_summary', {item, shipping_fee, cancelled})
})
.post(upload.single('image'), async(req, res) => {
    const id = req.params.id;
    const user_id = res.locals.user.id
    const product = await Product.findById(id)
    let shipping_fee = 0;
    const shippingFee = await ShippingFee.find()
    shippingFee.forEach(cities => {
        cities.shippingFees.forEach(city => {
            if(city.city == res.locals.user.city){
                city.barangays.forEach(barangay => {
                    if(barangay.name == res.locals.user.barangay){
                        shipping_fee = barangay.fee
                    }
                })
            }
        })
    })

    if(req.body.payment_method == 'COD'){
        let sub_total = product.product_price * req.body.quantity
        let total_amount = sub_total + shipping_fee
        const order = await Order({
            order_type: 'USER',
            fullname: `${res.locals.user.firstname} ${res.locals.user.middlename} ${res.locals.user.lastname}`,
            user_id: user_id,
            items: [{
                product_id: id,
                name: product.product_name,
                price: product.product_price,
                quantity: req.body.quantity
            }],
            sub_total: sub_total,
            total_amount: total_amount,
            zip_code: res.locals.user.zip_code,
            house_no: res.locals.user.house_no,
            barangay: res.locals.user.barangay,
            city: res.locals.user.city,
            province: res.locals.user.province,
            contact_number: res.locals.user.contact_number,
            payment_method: req.body.payment_method
        })
        order.save()
        .then(() => console.log(order))
    }else{
        const result = await cloudinary.uploader.upload(req.file.path)

        let sub_total = product.product_price * req.body.quantity
        let total_amount = sub_total + shipping_fee
        const order = await Order({
            order_type: 'USER',
            fullname: `${res.locals.user.firstname} ${res.locals.user.middlename} ${res.locals.user.lastname}`,
            user_id: user_id,
            items: [{
                product_id: id,
                name: product.product_name,
                price: product.product_price,
                quantity: req.body.quantity
            }],
            sub_total: sub_total,
            total_amount: total_amount,
            zip_code: res.locals.user.zip_code,
            house_no: res.locals.user.house_no,
            barangay: res.locals.user.barangay,
            city: res.locals.user.city,
            province: res.locals.user.province,
            contact_number: res.locals.user.contact_number,
            payment_method: req.body.payment_method,
            // img_name: req.file.filename,
            img_name: result.secure_url,
            // image: {
            //     data: fs.readFileSync('uploads/' + req.file.filename),
            //     contentType: 'image/png'
            // }
        })
        order.save()
    }
    res.redirect('/user/order')
})

router.route('/about')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/about', {cancelled})
})

// / user/faqs1
router.route('/faqs1')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/faqs/faqs1', {cancelled})
})
router.route('/faqs2')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/faqs/faqs2', {cancelled})
})
router.route('/faqs3')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/faqs/faqs3', {cancelled})
})
router.route('/faqs4')
.get(async(req, res) => {
    const user_id = res.locals.user.id;
    const cancelled = await Cancelled.findOne({user_id}).count();
    res.render('user/faqs/faqs4', {cancelled})
})

module.exports = router;
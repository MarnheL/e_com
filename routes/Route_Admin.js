const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
router.use(cookieParser());

const multer = require('multer');
const path = require('path');
const fs = require('fs')
const moment = require('moment')

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

// models / database
const Product = require('../models/Product')
const Order = require('../models/Order')
const ShoppingCart = require('../models/Shopping_Cart');
const Account = require('../models/Account')
const Sales = require('../models/Sales_Report')
const Remove_Item = require('../models/Remove_Item')
const shippingFees = require('../middleware/ship')

// account authentication
const { adminAuth, checkAdmin } = require('../middleware/auth');

router.get('/*', adminAuth);
router.get('/*', checkAdmin);
router.post('/*', checkAdmin);

router.route('/dashboard')
.get(async(req, res) => {
    const sales = await Sales.find()
    let total_sales = 0
    if(sales){
        sales.forEach(data => {
            total_sales = total_sales + data.sub_total
        })
    }
    const product = await Product.find({isArchive: false})
    res.render('admin/dashboard', {total_sales, product})
})

router.route('/dashboard/accounts')
.get(async(req, res) => {
    const sales = await Sales.find()
    let total_sales = 0
    if(sales){
        sales.forEach(data => {
            total_sales = total_sales + data.sub_total
        })
    }
    const account = await Account.find({accountType: 'user'})
    res.render('admin/dashboard_account', {total_sales, account})
})

router.route('/inventory')
.get(async(req, res) => {
    const renderProduct = await Product.find({isArchive: false});
    res.render('admin/inventory', {renderProduct})
})

const Category = require('../models/Category')

router.route('/inventory/add-product')
.get(async(req, res) => {
    const cart = await ShoppingCart.find()
    res.render('admin/add_product')
})
.post(upload.single('image'), async(req, res) => {
    const { product_name, product_price, product_category, product_stocks } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path)
    console.log(result)
    
    const create = await Product({
        product_name: product_name,
        product_price: product_price,
        product_category: product_category,
        product_stock: product_stocks,
        img_name: req.file.filename,
        img_name: result.secure_url,
        // image: {
        //     data: fs.readFileSync('uploads/' + req.file.filename),
        //     contentType: 'image/png'
        // }
    })
    create.save()
    .then(async(result) => {
        console.log(`${create} is successfully created`)
        console.log(create.product_category)
        const cat = await Category.findOne({category: create.product_category})
        console.log(cat)
        if(cat == null){
            const category = await Category({
                category: create.product_category
            })
            category.save()
        }
        res.redirect('/admin/inventory')
    })
    .catch(err => {
        console.log(err.message)
    })
})

router.route('/archive')
.get(async(req,res) => {
    const product = await Product.find({isArchive: true})
    res.render('admin/archive', {product})
})

router.route('/archive/:id/restore')
.post(async(req, res) => {
    const id = req.params.id;
    const archive = await Product.findByIdAndUpdate(id, {isArchive: false}, {new:true})
    res.redirect('/admin/archive')
})

router.route('/archive/:id/delete')
.post(async(req, res) => {
    const id = req.params.id;
    const archive = await Product.findByIdAndDelete(id)
    console.log(archive.product_category)
    const checCat = await Product.findOne({product_category: archive.product_category})
    console.log(checCat)
    if(checCat == null){
        await Category.findOneAndDelete({category: archive.product_category})
    }
    res.redirect('/admin/archive')
})

router.route('/inventory/:id/view-product')
.get(async(req, res) => {
    const id = req.params.id;
    const item = await Product.findById(id)
    // console.log(item)
    res.render('admin/view_product', {item})
})

router.route('/inventory/:id/archive')
.get(async(req, res) => {
    const id = req.params.id;
    const archive = await Product.findByIdAndUpdate(id, {isArchive: true}, {new:true})
    console.log(archive.isArchive)
    res.redirect('/admin/inventory')
})

// router.route('/inventory/:id/archive')
// .post(async(req, res) => {
//     const id = req.params.id;
//     const archive = await Product.findByIdAndUpdate(id, {isArchive: true}, {new:true})
//     console.log(archive.isArchive)
//     res.redirect('/admin/inventory')
// })

router.route('/inventory/:id/update-product')
.get(async(req, res) => {
    const id = req.params.id;
    const item = await Product.findById(id)
    console.log(item.product_name)
    res.render('admin/update_product', {item})
})

router.route('/inventory/:id/update-product-info')
.patch(async(req, res) => {
    const id = req.params.id;
    const options = {new: true};
    const {product_name, product_price, product_category, product_stocks} = req.body;
    const item = await Product.findById(id)
    const current_stock = item.product_stock;
    try {
        const update_product = await Product.findByIdAndUpdate(id, {
            product_name: product_name,
            product_price: product_price,
            product_category: product_category,
            product_stock: product_stocks,
        }, options);
        const removeItem = await Remove_Item({
            product_name: update_product.product_name,
            product_price: update_product.product_price,
            product_category: update_product.product_category,
            current_stock: current_stock,
            product_quantity: update_product.product_stock - current_stock,
            updated_stock: update_product.product_stock,
            reason: 'Add Stock',
            img_name: update_product.img_name,
            image: update_product.image,
        })
        removeItem.save()
        console.log(removeItem)
        res.redirect('/admin/inventory')
    } catch (error) {
        console.log(error.message)
        res.redirect('/admin/inventory')
    }
})

router.route('/inventory/:id/update-product-image')
.patch(upload.single('image'), async(req, res) => {
    const id = req.params.id;
    const options = {new: true};
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const update_product = await Product.findByIdAndUpdate(id, {
            img_name: result.secure_url,
            // image: {
            //     data: fs.readFileSync('uploads/' + req.file.filename),
            //     contentType: 'image/png'
            // }
        }, options);
        // console.log(update_product.img_name)
        const cart = await ShoppingCart.find()
        cart.forEach(data => {
            let itemIndex = data.items.findIndex(p => p.product_id == id)
            if(itemIndex > -1){
                console.log(data.items[itemIndex].product_image)
                data.items[itemIndex].product_image = update_product.img_name;
            }
            data.save()
            .then(() => console.log(data))
        })
        res.redirect('/admin/inventory')
    } catch (error) {
        console.log(error.message)
        res.redirect('/admin/inventory')
    }
})


router.route('/inventory/:id/remove-item')
.post(async(req, res) => {
    const id = req.params.id;
    const {reason, quantity, password} = req.body
    const product = await Product.findById(id)
    if(password == res.locals.user.password){
        const remove = await Product.findByIdAndUpdate(id, {
            $inc: {product_stock: -quantity}
        }, {new: true})
        const removeItem = await Remove_Item({
            product_name: product.product_name,
            product_price: product.product_price,
            product_category: product.product_category,
            current_stock: product.product_stock,
            product_quantity: quantity,
            updated_stock: product.product_stock - quantity,
            reason: reason,
            img_name: remove.img_name,
            // image: remove.image,
        })
        removeItem.save()
        console.log('successfully remove item')
    }else{
        console.log('cannot remove item')
    }
    res.redirect('/admin/inventory')
})

router.route('/inventory/:id/sell-item')
.post(async(req, res) => {
    const id = req.params.id
    const {quantity} = req.body
    const remove = await Product.findByIdAndUpdate(id, {
        $inc: {product_stock: -quantity}
    }, {new: true})
    console.log(remove)
    const sales = await Sales({
        items: [{
            product_id: remove.id,
            product_name: remove.product_name,
            product_quantity: quantity,
            product_price: remove.product_price,
            product_image: remove.img_name,
        }],
        sub_total: remove.product_price * quantity,
        reason: 'Walk In',
        shipping_fee: 0
    })
    // console.log(sales)
    sales.save()
    // .then(() => {
    //     console.log(sales)
    // })
    res.redirect('/admin/inventory')
})

// display all pending order
router.route('/order-status')
.get(async(req, res) => {
    const order = await Order.find({status: 'pending'})
    res.render('admin/order_status', {order})
})

router.route('/order-status/:id')
.get(async(req, res) => {
    try {
        const id = req.params.id
        const order = await Order.findById(id)
        const image_url = order.img_name
        res.render('admin/image', {image_url})
    } catch (error) {
        res.send('server error')
    }
})

// approve pending order
router.route('/order-status/:id/ongoing')
.get(async(req, res) => {
    const id = req.params.id
    const order = await Order.findByIdAndUpdate(id, {status: 'to ship'}, {new: true})
    console.log(order)
    let shipping_fee = 0;
        let city = shippingFees.find(p => p.city == order.city)
        // console.log(city)
        if(city){
            let barangay = city.barangays.find(p => p.name == order.barangay)
            if(barangay){
                shipping_fee = barangay.fee
            }
        }
    let product_price = 0
    let item = []
    order.items.forEach(async (data) => {
        product_price += data.price
        item.push({
            product_id: data.id,
            product_name: data.name,
            product_quantity: data.quantity,
            product_price: data.price,
            // product_image: data.product_image,
        })
    })
    const sales = await Sales({
        items: item,
        sub_total: product_price,
        reason: 'Online',
        shipping_fee: shipping_fee,
        total: shipping_fee + product_price,
    })
    console.log(sales)
    sales.save()
    res.redirect('/admin/order-status')
})
// cancel pending order
// router.route('/order-status/:id/cancel')
// .get(async(req, res) => {
//     const id = req.params.id
//     const order = await Order.findByIdAndUpdate(id, {status: 'cancelled'}, {new: true})
//     res.redirect('/admin/order-status')
// })

router.route('/order-status/:id/cancel')
.post(async(req, res) => {
    const id = req.params.id
    const other = req.body.other
    const reason = req.body.reason
    console.log(other, reason)
    if(reason == 'Other'){
        console.log('other is selected')
        await Order.findByIdAndUpdate(id, {status: 'cancelled', reason: other}, {new: true})
    }else{
        await Order.findByIdAndUpdate(id, {status: 'cancelled', reason: reason}, {new: true})
    }
    res.redirect('/admin/order-status')
})

// display ongoing  order
router.route('/ongoing-order')
.get(async(req, res) => {
    const order = await Order.find({status: 'to ship'})
    res.render('admin/ongoing_order', {order})
})
// proceed order to ongoing
// router.route('/order-status/:id/ongoing')
// .get(async(req, res) => {
//     const id = req.params.id
//     const order = await Order.findByIdAndUpdate(id, {status: 'ongoing'}, {new: true})
//     res.redirect('/admin/approve-order')
// })

// proceed order to out fordelivery
router.route('/order-status/:id/out-for-delivery')
.get(async(req, res) => {
    const id = req.params.id
    const order = await Order.findByIdAndUpdate(id, {status: 'out for delivery'}, {new: true})
    res.redirect('/admin/ongoing-order')
})

router.route('/out-for-delivery')
.get(async(req, res) => {
    const order = await Order.find({status: 'out for delivery'})
    res.render('admin/out_for_delivery', {order})
})

router.route('/order-status/:id/completed-order')
.get(async(req, res) => {
    const id = req.params.id
    const order = await Order.findByIdAndUpdate(id, {status: 'delivered'}, {new: true})
    res.redirect('/admin/out-for-delivery')
})

router.route('/completed-order')
.get(async(req, res) => {
    const order = await Order.find({status: 'delivered', isFinish: false})
    res.render('admin/completed_order', {order})
    
})

router.route('/order-status/:id/finish')
.get(async(req, res) => {
    const id = req.params.id
    const order = await Order.findByIdAndUpdate(id, {isFinish: true}, {new: true})
    res.redirect('/admin/completed-order')
  
})

router.route('/completed-order/history')
.get(async(req, res) => {
    const order = await Order.find({isFinish: true}).sort({createdAt: -1})
    res.render('admin/completed', {order})
})

router.route('/cancelled-order')
.get(async(req, res) => {
    const account = await Account.find()
    console.log(account)
    const order = await Order.find({status: 'cancelled'}).sort({createdAt: -1})
    res.render('admin/cancelled_order', {order})
})


router.route('/sales-report')
.get(async(req, res) => {
    try {
        let option = req.query.option
        let start = moment(req.query.start).add(1, 'days')
        let end = moment(req.query.end).add(1, 'days')
        let sales;
        if(req.query.start == undefined && req.query.end == undefined){
            sales = await Sales.find()
        }else{
            sales = await Sales.find({createdAt: {$gte: start.toDate(), $lte: end.toDate()}, reason: option})
        }
        let total_sales = 0
        if(sales){
            sales.forEach(data => {
                total_sales = total_sales + data.sub_total
            })
        }
        res.render('admin/sales_report', {total_sales, sales})
    } catch (error) {
        res.send('server error')
    }
})

router.route('/inventory-report')
.get(async(req, res) => {
    const search = req.query.result
    let report;
    if(search){
        report = await Remove_Item.find({
            $or: [
                {reason: {$regex: search}}
            ]
        })
    }else{
        report = await Remove_Item.find()
    }
    res.render('admin/inventory_report', {report})
})

router.route('/accounts')
.get(async(req, res) => {
    const account = await Account.find({accountType: {$ne: 'admin'}})
    res.render('admin/accounts', {account})
})

router.route('/accounts/:id/delete')
.get(async(req, res) => {
    const id = req.params.id
    const user = await Account.findByIdAndDelete(id)
    res.redirect('/admin/accounts')
})

router.route('/logout')
.post((req, res) => {
    res.cookie('admin_id', '', {maxAge: 1})
    console.log('logout successfully')
    res.redirect('/admin/login')
})

module.exports = router;
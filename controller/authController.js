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

const Account = require('../models/Account')

module.exports.admin_login_get = (req, res) => {
    res.render('admin_login', {messages: req.flash('message')})
}

module.exports.admin_login_post = async(req, res) => {
    const {email, password} = req.body;
    const find = await Account.findOne({email})
    console.log(find)
    if(find){
        console.log(`${find} is found`)
        if(find.accountType == 'admin'){
            if(find.password == password){
                const token = createToken(find.id);
                res.cookie('admin_id', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 })
                console.log(`successfully login`)
                return res.redirect('/admin/dashboard')
            }else{
                req.flash('message', 'Wrong Password')
                console.log(`wrong password`)
                return res.redirect('/admin/login')
            }
        }else{
            console.log(`not admin`)
            req.flash('message', 'Invalid Account')
            return res.redirect('/admin/login')
        }
    }
    req.flash('message', 'Invalid Username')
    console.log(`is not found`)
    res.redirect('/admin/login')
}

module.exports.user_login_get = (req, res) => {
    res.render('user_login', {messages: req.flash('message')})
}

module.exports.user_login_post = async(req, res) => {
    const {email, password} = req.body;
    const find = await Account.findOne({email})
    if(find){
        console.log(`${find} is found`)
        if(find.accountType == 'user'){
            if(find.password == password){
                const token = createToken(find.id);
                res.cookie('user_id', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 })
                console.log(`successfully login`)
                return res.redirect('/user/home')
            }else{
                // req.flash('message', 'Wrong Password')
                req.flash('message', 'Wrong Password')
                console.log(`Wrong password`)
                return res.redirect('/login')
            }
        }else{
            req.flash('message', 'Not a User Account')
            console.log(`Not User Account`)
            return res.redirect('/login')
        }
    }
    req.flash('message', 'No Account Found')
    console.log(`is not found`)
    res.redirect('/login')
}

module.exports.user_sign_up_get = (req, res) => {
    res.render('user_sign_up')
}

module.exports.user_sign_up_post = async(req, res) => {
    const { firstname, middlename, lastname, contact_number, email, zip_code, house_no, barangay, city, province, password } = req.body;
    const find = await Account.find({email})
    if(find == false){
        const create = new Account({
            firstname,
            middlename,
            lastname,
            contact_number,
            email: email,
            zip_code,
            house_no,
            barangay,
            city,
            province,
            complete_address: `${house_no} ${barangay} ${zip_code} ${city} ${province}`,
            password: password,
            accountType: 'user'
        })
        create.save()
        .then(() => {
            console.log(`${create} is created successfully`)
        })
        .catch(err => {
            console.log(err.message)
        })
        return res.redirect('/login')
    }
    console.log('user already existed')
    res.redirect('/sign-up')
}
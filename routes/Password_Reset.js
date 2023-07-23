const express = require('express');
const router = express.Router();

const Account = require('../models/Account')

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});

const otpGen = require('otp-generator')
const Mailgen = require('mailgen')
const nodemailer = require('nodemailer')

let config = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

let transporter = nodemailer.createTransport(config)
let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Password Reset',
        link: 'https://mailgen.js'
    }
})

router.route('/')
.get((req, res) => {
    res.render('reset_password')
})
.post(async(req, res) => {
    const email = req.body.email;
    const find = await Account.findOne({email})

    if(find){
        const otp = otpGen.generate(6, { upperCaseAlphabets: false, specialChars: false })
        let response = {
            body: {
                intro: `Here is your OTP <b>${otp}</b>`,
            }
        }
        let mail = MailGenerator.generate(response)
        let message = {
            from: 'E-COMMERCE APP <support@email.com>',
            to: email,
            subject: 'password reset',
            html: mail
        }
        await transporter.sendMail(message)
        .then((info) => {
            console.log('email is successfully generated',info.messageId)
            const generateToken = (id) => {
                return jwt.sign({id}, otp, {
                    expiresIn: 60 * 1000
                });
            }
            const token = generateToken(find.id)
            res.cookie('p_res', token, { httpOnly: true, secure: true, maxAge: 60 * 1000 })

            return res.redirect(`/password-reset/verify-otp/${find.id}`)
        })
        .catch((err) => {
            res.redirect('/password-reset')
        })
    }
})

router.route('/verify-otp/:id')
.get(async(req, res) => {
    const user = await Account.findById(req.params.id)
    res.render('OTP/otp_key', {user})
})
.post(async(req, res) => {
    const otp = req.body.otp;
    const token = req.cookies.p_res;
    if(token){
        jwt.verify(token, otp, async(err, decodedToken) => {
            if(err){
                return res.redirect('/password-reset')
            }else{
                const user = await Account.findById(decodedToken.id)
                if(user == null){
                    return res.redirect('/password-reset')
                }else{
                    return res.redirect(`/password-reset/create-password/${user.id}`)
                }
            }
        })
    }else{
        res.send('the token expires')
    }
})

router.route('/create-password/:id')
.get(async(req, res) => {
    const id = req.params.id
    const user = await Account.findById(id)
    res.render('OTP/new_password', {user});
})
.post(async(req, res) => {
    const id = req.params.id
    const new_password = req.body.new_password;
    const user = await Account.findByIdAndUpdate(id, {
        password: new_password,
    }, {new: true})
    console.log(user);
    res.redirect('/login');
})

module.exports = router
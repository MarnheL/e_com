const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { find } = require('../models/Product');
const Account = require('../models/Account')

dotenv.config({path: 'config.env'});
const secret = process.env.SECRET_KEY;

const adminAuth = (req, res, next) => {
    const token = req.cookies.admin_id;
    if(token){
        jwt.verify(token, secret, async(err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/admin/login');
            }else{
                // console.log(decodedToken.id)
                next();
            }
        })
    }else{
        res.redirect('/admin/login');
    }
}

const userAuth = (req, res, next) => {
    const token = req.cookies.user_id;
    if(token){
        jwt.verify(token, secret, async(err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }else{
                const user = await Account.findById(decodedToken.id);
                if(user == null){
                    res.cookie('user_id', '', {maxAge: 1})
                    return res.redirect('/login');
                }else{
                    next();
                    // res.cookie('user_id', '', {maxAge: 1})
                    // return res.redirect('/login');
                }
            }
        })
    }else{
        res.redirect('/login');
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.user_id;
    if(token){
        jwt.verify(token, secret, async(err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                const user = await Account.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

const checkAdmin = (req, res, next) => {
    const token = req.cookies.admin_id;
    if(token){
        jwt.verify(token, secret, async(err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                const user = await Account.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.redirect('/login');
    }
}

const checkGuess = (req, res, next) => {
    const token = req.cookies.guess_id;
    if(token){
        jwt.verify(token, secret, async(err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                res.redirect('/user-information');
            }else{
                if(decodedToken.user_id !== req.sessionID){
                    return res.redirect('/user-information');
                }
                // console.log(decodedToken.user_id)
                res.locals.guess = decodedToken;
                next();
            }
        })
    }else{
        res.redirect('/user-information');
    }
}

module.exports = { adminAuth, userAuth, checkUser, checkAdmin, checkGuess }
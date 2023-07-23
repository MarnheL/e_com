const express = require('express')
const router = express.Router();
const authController = require('../controller/authController')

const cookieParser = require('cookie-parser');
router.use(cookieParser());

const session = require('express-session');
router.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
}));

const flash = require('express-flash');
router.use(flash());

require('../middleware/passport')

router.get('/admin/login', authController.admin_login_get);
router.post('/admin/login', authController.admin_login_post);

router.get('/login', authController.user_login_get);
router.post('/login', authController.user_login_post);

router.get('/sign-up', authController.user_sign_up_get);
router.post('/sign-up', authController.user_sign_up_post);

router.route('/logout')
.get((req, res) => {
    res.cookie('user_id', '', {maxAge: 1})
    console.log('logout successfully')
    res.redirect('/login')
})




// router.get('/google', passport.authenticate('google', {scope:['profile', 'email']}))

// router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/failed'}), function(req, res){
//     res.redirect('/user/home')
// })

module.exports = router;
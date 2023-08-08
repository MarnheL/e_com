const express = require('express');
const methodOverride = require('method-override')
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
const bodyParser = require('body-parser');
mongoose.set('strictQuery', false);

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT;
// const PORT = 3000;

const Pre_Order = require('./models/Pre_Order')
// const Shipping = require('./models/Ship')

async function expiryDate(){
    let today = new Date();
    let expired = await Pre_Order.find({expiredAt: {$lt: today}})
    if(expired != ''){
        await Pre_Order.deleteMany({expiredAt: {$lt: today}})
    }
}

const mongoUri = 'mongodb://localhost:27017/ordering_system' || 'mongodb://127.0.0.1:27017/ordering_system'
// mongoose.connect(mongoUri)
// .then(res => {
//     console.log(`successfully connected to the database`)
// })
// .catch(err => {
//     console.log(err.message)
// })

const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI)
        const conn = await mongoose.connect('mongodb://localhost:27017/ordering_system')

        // const conn = await mongoose.connect('mongodb://localhost:27017/ordering_system')
        // console.log(`Successfully Connected To The Database ${conn.connection.host}`)
        console.log(`Successfully Connected To The Database`)
        expiryDate()
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`The server is running on http://localhost:${PORT}`);
    })
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'asset')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(methodOverride('_method'));

app.use(cors())

const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv');
// dotenv.config({path: 'config.env'});
const secret = process.env.SECRET_KEY;
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, secret, {
        expiresIn: maxAge
    });
}

// const guessAuth = (req, res, next) => {
//     const id = req.sessionID;
//     const token = createToken(id)
//     res.cookie('guess_id', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 })
//     next()
// }

// routes
const routeAdmin = require('./routes/Route_Admin');
const routeUser = require('./routes/Route_User');
const routeAuth = require('./routes/Route_Auth');
const routeGuess = require('./routes/Route_Guess');
const routePasswordReset = require('./routes/Password_Reset');
// routes

// login route
app.use('/', routeAuth);
// admin route
app.use('/admin', routeAdmin);
// user route
app.use('/user', routeUser);

// app.use('/',guessAuth,  routeGuess);
app.use('/',  routeGuess);

app.use('/password-reset',  routePasswordReset);

// app.listen(PORT, () => {
//     console.log(`Server is running on localhost: ${PORT}`);
// })
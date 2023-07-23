const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    contact_number: {
        type: String
    },
    email: {
        type: String,
    },
    zip_code: {
        type: Number
    },
    house_no: {
        type: String
    },
    barangay: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    complete_address: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String,
    },
    accountType: {
        type: String
    }
})

const Account = mongoose.model('Account', accountSchema)
module.exports = Account;

function createAccount(){
    const create = new Account({
        firstname: 'Marnhel',
        middlename: 'Obrero',
        lastname: 'Tarala',
        contact_number: 0978801968,
        email: 'Admin',
        password: 'password',
        accountType: 'admin'
    })
    create.save()
    .then(res => {
        console.log(`${create} is created`)
    })
    .catch(err => {
        console.log(err.message)
    })
}

// createAccount()
const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
//crate user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        unique: true, //This will make sure that no two users can have the same email in the database
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    },
    isAdmin: Boolean
})

//We can't use arrow function here because we need to use 'this' keyword
//'this' in lambda function refers to the calling function.

//But here, 'this' refers to the object that is calling this function
userSchema.methods.generateAuthToken = function() {
    //jwt.sign() takes two arguments, response payload and private key
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('privateKey'));
    return token;
}

//create user class
const User = mongoose.model('User', userSchema)

//validate user
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        isAdmin: Joi.boolean()
    })

    return schema.validate(user)
}

module.exports.User = User
module.exports.validate = validateUser
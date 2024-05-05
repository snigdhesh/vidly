const mongoose = require('mongoose')
const Joi = require('joi')
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
    }
})

//create user class
const User = mongoose.model('User', userSchema)

//validate user
function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(user)
}

module.exports.User = User
module.exports.validate = validateUser
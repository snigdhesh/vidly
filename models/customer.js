const Joi = require('joi')
const mongoose = require('mongoose')

//Create schema
const customerSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true, minLength: 5, maxLength: 50 }
})

//Create class, using schema
const Customer = mongoose.model('Customer', customerSchema)

//validate customer object with joi
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    })
    return schema.validate(customer)
}

module.exports.Customer = Customer
module.exports.validate = validateCustomer
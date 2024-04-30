const mongoose = require('mongoose')
const Joi = require('joi')
const express = require('express')
const router = express.Router();

//Create schema
const customerSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true, minLength: 5, maxLength: 50 }
})

//create class from schema
const Customer = mongoose.model('Customer', customerSchema)

//Get list of customer objects
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers)
})

//Create a customer object
router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({ name: req.body.name, isGold: req.body.isGold, phone: req.body.phone });
    customer = await customer.save()
    res.send(customer)
})

//Update a customer object
router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let customer;
    try {
        customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone }, { new: true })
    } catch (ex) {
        console.log(ex.message)
    }
    if (!customer) return res.status(404).send('The customer with the given ID was not found.')

    res.send(customer)
})


//Delete a customer object
router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) return res.status(404).send('The customer with the given ID was not found.')

    res.send(customer)
})

//validate customer object with joi
function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(5).max(50).required()
    })
    return schema.validate(customer)
}

module.exports = router;
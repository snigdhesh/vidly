
const { Customer, validate } = require('../models/customer')
const express = require('express')
const router = express.Router();


//Get list of customer objects
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers)
})

//Create a customer object
router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let customer = new Customer({ name: req.body.name, isGold: req.body.isGold, phone: req.body.phone });
    customer = await customer.save()
    res.send(customer)
})

//Update a customer object
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
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



module.exports = router;
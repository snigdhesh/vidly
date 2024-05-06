const express = require('express')
const lodash = require('lodash')
const router = express.Router()
const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(lodash.map(users, lodash.partialRight(lodash.pick, ['_id', 'name', 'email'])))
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne(lodash.pick(req.body, ['email']));
    if(!user) return res.status(400).send('Invalid email or password.')

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    res.send(true);
})


//validate user
function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(req)
}



module.exports = router


const express = require('express')
const lodash = require('lodash')
const router = express.Router()
const {User} = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

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

    //If all checks passed, generate a token and send it to the client.
    //sign() takes two arguments, payload and private key
    const token = jwt.sign({ _id: user._id}, config.get('privateKey'));
    res.send({ access_token: token});
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


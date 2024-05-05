const express = require('express')
const lodash = require('lodash')
const router = express.Router()
const {User, validate} = require('../models/user')

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
    if(user) return res.status(400).send('User already registered.')

    user = new User(lodash.pick(req.body, ['name', 'email', 'password']))

    try {
        const savedUser = await user.save()
        res.json(lodash.pick(savedUser, ['_id', 'name', 'email']))
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router


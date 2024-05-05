const express = require('express')
const router = express.Router()
const {User, validate} = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.')

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router


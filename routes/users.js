const express = require('express')
const lodash = require('lodash')
const router = express.Router()
const {User, validate} = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth') //This returns a middleware function


router.get('/me',auth,async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(lodash.map(users, lodash.partialRight(lodash.pick, ['_id', 'name', 'email','isAdmin'])))
    } catch (err) {
        res.send({ message: err })
    }
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne(lodash.pick(req.body, ['email']));
    if(user) return res.status(400).send('User already registered.')

    user = new User(lodash.pick(req.body, ['name', 'email', 'password','isAdmin']))

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        const savedUser = await user.save()
        //You get tokens in two places, 
         //- when you create user, you get token in response headers
         //- You can also get token by sending a post request to /api/auth
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send(lodash.pick(savedUser, ['_id', 'name', 'email','isAdmin']))
    } catch (err) {
        console.log(err)
        res.send({ error: err.message })
    }
})

module.exports = router


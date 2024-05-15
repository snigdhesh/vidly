const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router();


router.get('/', async (req, res) => {
    res.send("returns");
});

router.post('/', async (req, res) => {
    if(!req.body.customerId) res.status(400).send('Missing customerId');
    if(!req.body.movieId) res.status(400).send('Missing customerId');

    res.status(401).send('Unauthorized')
});

module.exports = router;
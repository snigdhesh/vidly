const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router();


router.get('/', async (req, res) => {
    res.send("returns");
});

router.post('/', async (req, res) => {
    res.status(401).send('Unauthorized')
});

module.exports = router;
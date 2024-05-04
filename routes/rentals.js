const express = require('express')
const router = express.Router();
const { Rental, validateRental } = require('../models/rental')

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); // '-' is used to sort in descending order
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const rental = new Rental({
        customer: {
            _id: req.body.customerId,
            name: req.body.customerName,
            phone: req.body.customerPhone
        },
        movie: {
            _id: req.body.movieId,
            title: req.body.movieTitle,
            dailyRentalRate: req.body.dailyRentalRate
        }
    })

    //We have two save methods here, one for rental and one for movie
    //If we want to save both rental and movie, we need to use transaction
    //Cause if we save rental and movie and if movie save fails, we need to rollback rental save
    //Transactions are not supported by mongoose, hence we need to use two phase commit protocol : This is an advanced concept, do some research to learn more
    const result = await rental.save()
    movie.numberInStock--;
    movie.save();
    console.log(result);
    res.send(result);
});

module.exports = router; 
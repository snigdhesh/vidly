const express = require('express')
const router = express.Router();
const { Rental, validateRental } = require('../models/rental')
const { Customer } = require('../models/customer')
const { Movie } = require('../models/movie')

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); // '-' is used to sort in descending order
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validateRental(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId);
    const movie = await Movie.findById(req.body.movieId);

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    //We have two save methods here, one for rental and one for movie
    //If we want to save both rental and movie, we need to use transaction
    //Cause if we save rental and movie and if movie save fails, we need to rollback rental save
    //Transactions are not supported by mongoose, hence we need to use two phase commit protocol : This is an advanced concept, do some research to learn more
    try {
        const result = await rental.save()
        movie.numberInStock--;
        movie.save();
        console.log(result);
        res.send(result);
    } catch (err) {
        res.send(err)
    }
});

module.exports = router; 
const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router();
const { Rental } = require('../models/rental')
const { Movie } = require('../models/movie')
const Joi = require('joi')
const validate = require('../middleware/validate')

router.get('/', async (req, res) => {
    res.send("returns");
});

router.post('/', [auth, validate(validateReturn)], async (req, res) => {

    const rental = await Rental.lookup(req.body.customerId, req.body.movieId)

    if (!rental) res.status(404).send('Bad Request')
    if (rental.dateReturned) res.send(400).send('Rental already processed')

    //This method sets 'rentalFee' property
    rental.return();

    await rental.save();

    await Movie.findByIdAndUpdate({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 } //inc function will increment numberInStock by 1
    });

    return res.status(200).send(rental);
});

function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })

    return schema.validate(req)
}

module.exports = router;
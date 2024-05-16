const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router();
const {Rental} = require('../models/rental')
const {Movie} = require('../models/movie')
const moment = require('moment')


router.get('/', async (req, res) => {
    res.send("returns");
});

router.post('/',auth, async (req, res) => {
    
    if(!req.body.customerId) res.status(400).send('Missing customerId');
    if(!req.body.movieId) res.status(400).send('Missing movieId');

    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId
    })

    if(!rental) res.status(404).send('Bad Request')
    if(rental.dateReturned) res.send(400).send('Rental already processed')

    rental.dateReturned = new Date();
    //moment() will return current date time
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee =  rentalDays * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.findByIdAndUpdate({_id: rental.movie._id},{
        $inc: {numberInStock: 1} //inc function will increment numberInStock by 1
    });

    return res.status(200).send();
});

module.exports = router;
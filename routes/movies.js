const express = require('express');
const router = express.Router();
const { Movie, Genre,validateMovie } = require('../models/movie')


router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});


router.post('/', async (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    
    if (!genre) return res.status(400).send('Invalid genre');

    //We are using hybrid approach to create a movie with genre as nested object.
    //We are using this approach for better performance, as we can get the genre object in a single query.
    //But we still need genre.js, cause if at all we want just list of genres, we can get it from genre.js


    let movie = new Movie({
        title: req.body.title,
        genre: { //We want to store only genre id and name in movie object
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })

    const result = await movie.save()
    console.log(result);
    res.send(result);
});

module.exports = router;
const mongoose = require('mongoose')
const {genreSchema} = require('./genre')
const Joi = require('joi')


//create a movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

//create a genre class
const Genre = mongoose.model('Genre', genreSchema)
//create a movie class
const Movie = mongoose.model('Movie', movieSchema)


//validate movie
const validateMovie = (movie) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().hex().length(24).required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    })
    return schema.validate(movie)
}



module.exports.Movie = Movie
module.exports.Genre = Genre
module.exports.validateMovie = validateMovie
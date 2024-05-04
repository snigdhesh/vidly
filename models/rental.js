const express = require('express')


//create customer schema
//We are not using existing customer schema, cause we want to store only name, isGold and phone in rental object
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
})

//create movie schema
//We are not using existing movie schema, cause we want to store only title and dailyRentalRate in rental object
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
})

//create rental schema
const rentalSchema = new mongoose.Schema({
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

//create customer class
const Customer = mongoose.model('Customer', customerSchema)

//create movie class
const Movie = mongoose.model('Movie', movieSchema)

//create rental class
const Rental = mongoose.model('Rental', rentalSchema)

//validate rental
const validateRental = (rental) => {
    const schema = Joi.object({
        customerId: Joi.string().hex().length(24).required(),
        movieId: Joi.string().hex().length(24).required()
    })
    return schema.validate(rental)
}

module.exports.Customer = Customer
module.exports.Movie = Movie
module.exports.Rental = Rental
module.exports.validateRental = validateRental


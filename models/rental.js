const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')


//create customer schema
//We are not using existing customer schema, cause we want to store only name, isGold and phone in rental object
const customerSchema2 = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
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
const movieSchema2 = new mongoose.Schema({
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
        type: customerSchema2,
        required: true
    },
    movie: {
        type: movieSchema2,
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
const Customer2 = mongoose.model('Customer2', customerSchema2)

//create movie class
const Movie2 = mongoose.model('Movie2', movieSchema2)

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


module.exports.Rental = Rental
module.exports.validateRental = validateRental


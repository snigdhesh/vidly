const Joi = require('joi')
const mongoose = require('mongoose')

//Create schema
const genreSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 }
})

//Create class, using schema
const Genre = mongoose.model('Genre', genreSchema)



const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        //description: Joi.string().min(3).required()
    })

    return schema.validate(genre) //This returns an object
}

module.exports.Genre = Genre
module.exports.validate = validateGenre
const express = require('express')
const Joi = require('joi') //This returns a class
const router = express.Router();
const mongoose = require('mongoose') //This returns an object

//Create schema
const genreSchema = mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 50 }
})

//Create class, using schema
const Genre = mongoose.model('Genre', genreSchema)


//Get list of genre objects
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres)
})


//Add a genre object
router.post('/', async (req, res) => {
    const { error } = validateGenre(req.body) //This returns an object
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save()
    res.send(genre)
})


//Update a genre object
router.put('/:id', async (req, res) => {
    const { error } = validateGenre(req.body) //This returns an object
    if (error) return res.status(400).send(error.details[0].message)
    let genre;
    try {
        genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    } catch (ex) {
        console.log(ex.message)
    }
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')

    res.send(genre)
})

//Delete a genre object
router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')

    res.send(genre)
})


//Get single genre object
router.get('/:id', async (req, res) => {
    const genres = await Genre.findById(req.params.id);
    res.send(genres)
})



const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        //description: Joi.string().min(3).required()
    })

    return schema.validate(genre) //This returns an object
}

module.exports = router;
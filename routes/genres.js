const { Genre, validate } = require('../models/genre')
const express = require('express')
const router = express.Router();




//Get list of genre objects
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres)
})


//Add a genre object
router.post('/', async (req, res) => {
    const { error } = validate(req.body) //This returns an object
    if (error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save()
    res.send(genre)
})


//Update a genre object
router.put('/:id', async (req, res) => {
    const { error } = validate(req.body) //This returns an object
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





module.exports = router;
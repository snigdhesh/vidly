const express = require('express')
const Joi = require('joi') //This returns a class
const router = express.Router();

const genres = [
    { id: 1, name: 'Action', description: 'Movies with lots of action and excitement.' },
    { id: 2, name: 'Comedy', description: 'Movies that make you laugh and smile.' },
    { id: 3, name: 'Drama', description: 'Movies that evoke strong emotions and tell compelling stories.' },
    { id: 4, name: 'Thriller', description: 'Movies that keep you on the edge of your seat with suspense.' },
    { id: 5, name: 'Sci-Fi', description: 'Movies that explore futuristic concepts and scientific possibilities.' }
];

//Get list of genre objects
router.get('/', (req, res) => {
    res.send(genres)
 })

 //Delete a genre object
router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
 })

  //Add a genre object
router.post('/', (req, res) => {
    const result = validateGenre(req.body);
    
    if(result.error) return res.status(400).send(result.error.details[0].message)

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
        description: req.body.description
    }
    genres.push(genre)
    res.send(genre)
 })

   //Update a genre object
router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    genre.name = req.body.name
    genre.description = req.body.description
    res.send(genre)
 })

 const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).required()
    })
    
    return schema.validate(genre) //This returns an object
 }

 module.exports = router;
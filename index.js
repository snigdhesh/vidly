const express = require('express') //This returns a function

const app = express() //This returns an object

app.use(express.static('./public')) //This is a middleware that serves static files from the public directory

const genres = [
    { id: 1, name: 'Action', description: 'Movies with lots of action and excitement.' },
    { id: 2, name: 'Comedy', description: 'Movies that make you laugh and smile.' },
    { id: 3, name: 'Drama', description: 'Movies that evoke strong emotions and tell compelling stories.' },
    { id: 4, name: 'Thriller', description: 'Movies that keep you on the edge of your seat with suspense.' },
    { id: 5, name: 'Sci-Fi', description: 'Movies that explore futuristic concepts and scientific possibilities.' }
];

app.get('/', (req, res) => {res.send() })

//Get list of genre objects
app.get('/api/genres', (req, res) => {
    res.send(genres)
 })

 //Delete a genre object
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('The genre with the given ID was not found.')
    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genre)
 })

app.listen(3000, () => {console.log("listening on port 3000..")} )
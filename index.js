const express = require('express') //This returns a function
const genres = require('./routes/genres') //This returns an object
const app = express() //This returns an object

app.use(express.static('./public')) //This is a middleware that serves static files from the public directory
app.use(express.json()) //This is a middleware that parses incoming requests with JSON payloads and is based on body-parser

app.use('/api/genres', genres) //This is a middleware that uses the genres route

app.get('/', (req, res) => {res.send() })

app.listen(3000, () => {console.log("listening on port 3000..")} )
const express = require('express') //This returns a function
const genres = require('./routes/genres') //This returns an object
const home = require('./routes/home') //This returns an object
const app = express() //This returns an object
const auth = require('./middleware/auth') //This returns a function

app.use(express.static('./public')) //This is a middleware that serves static files from the public directory
app.use(express.json()) //This is a middleware that parses incoming requests with JSON payloads and is based on body-parser
app.use(auth) //This is example of a custom middleware
app.use('/api/genres', genres) //This is a middleware that uses the genres route
app.use('/',home) //This is a middleware that uses the home route

const port = process.env.PORT || 3000 
//You can set env variable on WINDOWS, like shown below
//set PORT=5000

app.listen(port, () => {console.log(`listening to port ${port}`)})
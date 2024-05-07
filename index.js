require('express-async-errors') //We need to load this module, when application starts. So this should be declared first.
const express = require('express') //This returns a function
const app = express() //This returns an object

const database = require('mongoose') //This returns an object
const config = require('config') //This returns an object

//Routes
const genres = require('./routes/genres') //This returns an object
const home = require('./routes/home') //This returns an object
const customers = require('./routes/customers') //This returns an object
const movies = require('./routes/movies') //This returns an object
const rentals = require('./routes/rentals') //This returns an object
const users = require('./routes/users') //This returns an object
const auth = require('./routes/auth') //This returns an object

const globalErrorHandler = require('./middleware/error') //This returns a function


if(!config.get('privateKey')) { //This is a private key that is used to sign the token. This is stored in the config file
    console.error('FATAL ERROR: Private key is not set');
    process.exit(1); // 0 indicates success, anything but 0 indicates failure.
} 


//connect to database when application starts
database.connect(config.get('datasource.url'))
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))


app.use(express.static('./public')) //This is a middleware that serves static files from the public directory
app.use(express.json()) //This is a middleware that parses incoming requests with JSON payloads and is based on body-parser

app.use('/api/genres', genres) //This is a middleware that uses the genres route
app.use('/api/customers', customers) //This is a middleware that uses the customers route
app.use('/api/movies', movies) //This is a middleware that uses the movies route
app.use('/api/rentals', rentals) //This is a middleware that uses the rentals route
app.use('/api/users', users) //This is a middleware that uses the users route
app.use('/api/auth', auth) //This is a middleware that uses the auth route
app.use('/', home) //This is a middleware that uses the home route

//Global exception handling should be done after all middleware and routes are set up.
app.use(globalErrorHandler) //globalErrorHandler will catch any error that is thrown before this line.

const port = process.env.PORT || 3000
//You can set env variable on WINDOWS, like shown below
//set PORT=5000

app.listen(port, () => { console.log(`listening to port ${port}`) })
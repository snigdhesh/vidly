const express = require('express')
const genres = require('../routes/genres') //This returns an object
const home = require('../routes/home') //This returns an object
const customers = require('../routes/customers') //This returns an object
const movies = require('../routes/movies') //This returns an object
const rentals = require('../routes/rentals') //This returns an object
const users = require('../routes/users') //This returns an object
const auth = require('../routes/auth') //This returns an object
const returns = require('../routes/returns') // This returns a router object
const globalErrorHandler = require('../middleware/error') //This returns a function

const routes = (app) => {
    app.use(express.static('../public')) //This is a middleware that serves static files from the public directory
    app.use(express.json()) //This is a middleware that parses incoming requests with JSON payloads and is based on body-parser
    //Routes
    app.use('/api/genres', genres) //This is a middleware that uses the genres route
    app.use('/api/customers', customers) //This is a middleware that uses the customers route
    app.use('/api/movies', movies) //This is a middleware that uses the movies route
    app.use('/api/rentals', rentals) //This is a middleware that uses the rentals route
    app.use('/api/users', users) //This is a middleware that uses the users route
    app.use('/api/auth', auth) //This is a middleware that uses the auth route
    app.use('/api/returns', returns) //This is a middleware that uses 'returns' route
    app.use('/', home) //This is a middleware that uses the home route
    
    //Global exception handling should be done after all middleware and routes are set up.
    app.use(globalErrorHandler) //globalErrorHandler will catch any error that is thrown before this line.
}

module.exports = routes;
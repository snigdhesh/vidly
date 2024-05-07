const errorHandler =  (err, req, res, next) => { //This is an error handling middleware
    res.status(500).send('Internal server')
}

module.exports = errorHandler; //This returns a function
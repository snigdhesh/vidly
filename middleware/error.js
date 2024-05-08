//This is global error handling middleware. It is used to handle any errors that occur in the application.


const winston = require('winston')


const errorHandler =  (err, req, res, next) => { //This is an error handling middleware
    //To log errors we use winston.error()
    //Similary
    //winston.warn()
    //winston.info()
    //winston.verbose()
    //winston.debug()
    //winston.silly()
    winston.error(err.message, err) //This logs the error to the logfile.log file
    res.status(500).send('Internal server')
}

module.exports = errorHandler; //This returns a function
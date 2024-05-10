//We need to load this module, when application starts. So this should be declared first.
//This module is responsible for catching uncaught exceptions and unhandled promise rejections.
require('express-async-errors')

//Import winston module, to log errors to a file/console.
const winston = require('winston')

//Import winston-mongodb module, to log errors to a mongodb database.
require('winston-mongodb') //We don't need to store it to a const, as we already have winston, it can take care of it.

//Import config module, to get the mongodb url.
const config = require('config')


const logging = () => {
    //We add file transport to winston. This will log all errors to a file called 'logfile.log'
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));

    //We add console transport to winston. This will log all errors to the console
    winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));

    //We add mongodb transport to winston. This will log all errors to a mongodb database
    winston.add(new winston.transports.MongoDB({
        db: config.get('datasource.url'),
        format: winston.format.metadata(),
        level: 'error'
    })); //Without format.metadata() mongodb object will have not error stack trace. (This is optional)

    //We can use new log file, to log all uncaught exceptions. This will log all uncaught exceptions to a file called 'uncaughtExceptions.log' 
    winston.exceptions.handle(new winston.transports.File({ filename: 'uncaughtExceptions.log' }))
}

module.exports = logging
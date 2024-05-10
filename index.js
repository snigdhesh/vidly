require('express-async-errors') //We need to load this module, when application starts. So this should be declared first.
const express = require('express') //This returns a function
const app = express() //This returns an object. This should be a single instance for entire application

const database = require('mongoose') //This returns an object
const config = require('config') //This returns an object

//Routes
require('./startup/routes')(app)

//Import winston module, to log errors to a file/console.
const winston = require('winston')
//Import winston-mongodb module, to log errors to a mongodb database.
require('winston-mongodb') //We don't need to store it to a const, as we already have winston, it can take care of it.
//We add file transport to winston. This will log all errors to a file called 'logfile.log'
winston.add(new winston.transports.File({filename: 'logfile.log'}));
//We add console transport to winston. This will log all errors to the console
winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }));
//We add mongodb transport to winston. This will log all errors to a mongodb database
winston.add(new winston.transports.MongoDB({ 
    db: config.get('datasource.url'),
    format: winston.format.metadata(),
    level: 'error'
 })); //Without format.metadata() mongodb object will have not error stack trace. (This is optional)
//We can use new log file, to log all uncaught exceptions. This will log all uncaught exceptions to a file called 'uncaughtExceptions.log' 
winston.exceptions.handle(new winston.transports.File({filename: 'uncaughtExceptions.log'}))



if(!config.get('privateKey')) { //This is a private key that is used to sign the token. This is stored in the config file
    console.error('FATAL ERROR: Private key is not set');
    process.exit(1); // 0 indicates success, anything but 0 indicates failure.
} 


//connect to database when application starts
database.connect(config.get('datasource.url'))
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err))





const port = process.env.PORT || 3000
//You can set env variable on WINDOWS, like shown below
//set PORT=5000

app.listen(port, () => { console.log(`listening to port ${port}`) })


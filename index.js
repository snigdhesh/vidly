
const winston = require('winston');
const express = require('express') //This returns a function
const app = express() //This returns an object. This should be a single instance for entire application

//Logging module : This is put first, cause if something goes wrong in other modules, we need a log.
require('./startup/logging')();
//Routes module
require('./startup/routes')(app);
//Database module
require('./startup/db')();
//Configuration module: To check JWT private key configured or not within this application
require('./startup/configCheck')();




const port = process.env.PORT || 3000
//You can set env variable on WINDOWS, like shown below
//set PORT=5000

const server = app.listen(port, () => { winston.info(`listening to port ${port}...`) })

//We are exporting server object, so that we can use it in integration tests. Else there is no need to export it.
module.exports = server;


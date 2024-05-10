
const express = require('express') //This returns a function
const app = express() //This returns an object. This should be a single instance for entire application


const config = require('config') //This returns an object

//Logging module : This is put first, cause if something goes wrong in other modules, we need a log.
require('./startup/logging')();
//Routes module
require('./startup/routes')(app);
//Database module
require('./startup/db')();





if(!config.get('privateKey')) { //This is a private key that is used to sign the token. This is stored in the config file
    console.error('FATAL ERROR: Private key is not set');
    process.exit(1); // 0 indicates success, anything but 0 indicates failure.
} 






const port = process.env.PORT || 3000
//You can set env variable on WINDOWS, like shown below
//set PORT=5000

app.listen(port, () => { console.log(`listening to port ${port}`) })


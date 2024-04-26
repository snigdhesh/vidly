const express = require('express') //This returns a function
const app = express() //This returns an object
const config = require('config')


//Run 'SET NODE_ENV=production' from windows command line.
//Runs 'export NODE_ENV=production' from linux/MAC command line.
//process is a default global object in node. It has an env property which is used to access environment variables.
console.log(`${process.env.NODE_ENV}`) //This will return undefined, if no env is set.

const env = app.get('env') //This will return 'development' if no env is set.
console.log(env) //This will log 'development' if no env is set.

console.log(config) //This internally calls "app.get('env')" and returns the config object based on the environment
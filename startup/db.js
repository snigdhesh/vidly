const winston = require('winston');
const database = require('mongoose');
const config = require('config');

const db = () => {
 
    const databaseURL = config.get('datasource.url');

    const message = {
        env: process.env.NODE_ENV,
        value: `Connected to  ${databaseURL}...`
    }

    //connect to database when application starts
    database.connect(databaseURL)
        .then(() => winston.info(message));
}

module.exports = db;
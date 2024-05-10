const winston = require('winston');
const database = require('mongoose');
const config = require('config');

const db = () => {
    //connect to database when application starts
    database.connect(config.get('datasource.url'))
        .then(() => winston.info('Connected to MongoDB...'));
}

module.exports = db;
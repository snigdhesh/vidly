const express = require('express')
const app = express();

const config = require('config'); // Import config package
const mongoose = require('mongoose'); // Import mongoose package
const { createAuthor} = require('./models/author'); // Import Author model and createAuthor function
const {createCourse} = require('./models/course'); // Import Course model and createCourse function

mongoose.connect(config.datasource.url).then(() => {
    console.log('Connected to MongoDB..');
}).catch(err => {
    console.error('Could not connect to MongoDB..', err);
});

//createAuthor('Mosh', 'My bio');
createCourse('Node Course', '66363d279d681978b77ed590');


app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port}..`);
});
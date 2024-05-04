const express = require('express')
const app = express();

const config = require('config'); // Import config package
const mongoose = require('mongoose'); // Import mongoose package

const {Author,createCourse,addAuthor} = require('./models/course'); // Import Course model and createCourse function


mongoose.connect(config.datasource.url).then(() => {
    console.log('Connected to MongoDB..');
}).catch(err => {
    console.error('Could not connect to MongoDB..', err);
});

//createAuthor('Mosh', 'My bio');
// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'John' })
// ]);
//getCourse();
//updateAuthor('66367fc46a32fab4ec75bb7a');//Upate author name with courseId, we can't update author name directly as it's a child, we need to update author name using courseId

addAuthor('66368455633f6b45f409f80a', new Author({ name: 'Jane' }));

app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port}..`);
});
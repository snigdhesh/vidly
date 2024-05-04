const mongoose = require('mongoose')

//create a schema
const course = new mongoose.Schema({
    name: {type: String,required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
});

//create a class
const Course = mongoose.model('Course',course);

const create = async (name,author) => {
    const course = new Course({
        name,
        author
    })

    const result = await course.save()
    console.log("Course created successfully: ",result)
};

module.exports.Course = Course;
module.exports.createCourse = create;

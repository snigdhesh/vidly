const mongoose = require('mongoose');


//create author schema
const authorSchema = new mongoose.Schema({
    name: String,
    bio: String
});

//create author class
const Author = mongoose.model('Author',authorSchema);


//create course schema
const course = new mongoose.Schema({
    name: {type: String,required: true},
    author: authorSchema //reference to author schema
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

const get = async () => {
    const courses = await Course.find().populate('author','name bio -_id').select('name author')
    console.log(courses);
}

const updateAuthor = async (id) => {
    const course = await Course.findById(id);
    course.author.name = 'Naga Vadlapudi';
    course.save();
    console.log("Author updated successfully: ",course);
}

module.exports.Course = Course;
module.exports.createCourse = create;
module.exports.getCourse = get;
module.exports.updateAuthor = updateAuthor;

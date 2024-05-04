const mongoose = require('mongoose');


//create author schema
const authorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    bio: String
});

//create author class
const Author = mongoose.model('Author',authorSchema);


//create course schema
const course = new mongoose.Schema({
    name: {type: String,required: true},
    authors: [authorSchema]
});


//create a class
const Course = mongoose.model('Course',course);

const create = async (name,authors) => {
    const course = new Course({
        name,
        authors
    })

    const result = await course.save()
    console.log("Course created successfully: ",result)
};

const get = async () => {
    const courses = await Course.find().populate('author','name bio -_id').select('name author')
    console.log(courses);
}

const updateAuthor = async (courseId) => {
    //With this approach, we dont' have to get object > update it > save it. We can directly update it.
    const course = await Course.updateOne({_id: courseId},
        {
            $unset: {
                'author': ''
            }
        });
    
    console.log("Author updated successfully: ",course);
}

const addAuthor = async (courseId, author) => {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
    console.log("Author added successfully: ",course);
}

const removeAuthor = async (courseId, authorId) => {
    const course = await Course.findById(courseId);
    course.authors.pull(authorId);
    course.save();
    console.log("Author removed successfully: ",course);
}

module.exports.Course = Course;
module.exports.createCourse = create;
module.exports.getCourse = get;
module.exports.updateAuthor = updateAuthor;
module.exports.Author = Author;
module.exports.addAuthor = addAuthor;
module.exports.removeAuthor = removeAuthor;

const mongoose = require('mongoose')

//create a schema
const author = new mongoose.Schema({
    name: {type: String,required: true},
    bio: String
})

//create a class
const Author = mongoose.model('Author',author)


const create = async (name,bio) => {
    const author = new Author({
        name,
        bio
    })

    const result = await author.save()
    console.log("Author created successfully: ",result)
};

module.exports.Author = Author;
module.exports.createAuthor = create;
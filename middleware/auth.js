const auth = (req,res,next) => {
    console.log('Authentication filter ..');
    next(); //This is a reference to the next middleware function in the pipeline
}

module.exports = auth; //This returns a function
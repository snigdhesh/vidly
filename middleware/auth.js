const jwt = require('jsonwebtoken')
const config = require('config')

//To test this, you need create a user and get the token from the response header
//Pass same header and it's value to API that requires authentication
const auth = (req,res,next) => {
    if(!req.header('x-auth-token')) return res.status(401).send('Access denied. No token provided');
    const token = req.header('x-auth-token');
    try {
        const decoded = jwt.verify(token, config.get('privateKey')); //This returns the payload of the token
        req.user = decoded;
        next(); //This is a reference to the next middleware function in the request flow
    } catch (ex) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth; //This returns a function
const admin = (req, res, next) => {
    //401 Unauthorized
    //403 Forbidden
    if (!req.user.isAdmin) return res.status(403).send('Access denied.');
    //If the user is an admin, pass control to the next middleware function in the request flow
    next();
}

module.exports = admin; //This returns a function
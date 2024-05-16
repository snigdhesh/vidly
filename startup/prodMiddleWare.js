//All the middleware that we need to install for prod env is added here.
const helmet = require('helmet') //This returns a function
const compression = require('compression') //This returns a function

const prodMiddleWare = (app) => {
    app.use(helmet());
    app.use(compression());
}

module.exports = prodMiddleWare
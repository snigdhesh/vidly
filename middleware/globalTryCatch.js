//See routes > genres.js > router.get('/', tryCatchMiddleWare(getGenres)) for usage.
//router expectes a function as second parameter. So, return a function from tryCatchMiddleWare (this file)
const tryCatchMiddleWare = (anyFunction) => {
    return async (req, res, next) => {
        try {
            await anyFunction(req, res); //Ex: getGenres(req, res) is executed here
        } catch (ex) {
            next(ex);
        }
    }

}

module.exports = tryCatchMiddleWare; //This returns a function
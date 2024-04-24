const express = require('express') //This returns a function

const app = express() //This returns an object

app.use(express.static('./public')) //This is a middleware that serves static files from the public directory

app.get('/', (req, res) => {res.send() })

app.listen(3000, () => {console.log("listening on port 3000..")} )
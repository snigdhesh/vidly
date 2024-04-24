const express = require('express') //This returns a function
const app = express() //This returns an object

app.get('/', (req, res) => {res.send("<h1>Hello world</h1>") })

app.listen(3000, () => {console.log("listening on port 3000..")} )
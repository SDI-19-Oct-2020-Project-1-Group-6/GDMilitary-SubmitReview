const bodyParser = require('body-parser')
const db = require ('./queries')

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Pushes a review by a user to database
app.get('/reviews', db.getReviews)

app.get('/idLookup', db.idLookup)

app.post('/submit', db.submitReview)

app.post('/addUser', db.addUser)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
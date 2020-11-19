const bodyParser = require('body-parser')
const db = require ('./queries')

const express = require('express')
const app = express()
const port = 3001

app.use(bodyParser.json())

//Pushes a review by a user to database
app.get('/reviews', db.getReviews)

app.post('/submit', db.submitReview)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
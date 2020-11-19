const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'reviews',
    password: 'pikachu',
    port: 5432
})


const getReviews = (req, res) => {
    pool.query('Select * FROM reviews', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const submitReview = (req, res) => {
    const { person_id, reviewStars, pros, cons, unit_id } = req.body
    
    pool.query('INSERT INTO reviews (person_id, reviewStars, pros, cons, unit_id) VALUES ($1, $2, $3, $4, $5)', [person_id, reviewStars, pros, cons, unit_id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).json("Successfully submitted review")
    })
}

const idLookup = (name) => {
    let nameID = -1; 
    pool.query('SELECT person_id FROM people WHERE name LIKE $1', [name], (error, results) => {
        if (error) {
            throw error
        }
        return nameID = results.rows[0].person_id
    })
}

module.exports = {
    getReviews,
    submitReview,
    idLookup
}
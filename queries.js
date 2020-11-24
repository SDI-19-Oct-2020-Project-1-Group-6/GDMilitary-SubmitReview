const { response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_ADDRESS || 'localhost',
    password: process.env.POSTGRES_PASSWORD || 'password',
    database: process.env.POSTGRES_DB || 'postgres',
    port: process.env.PGPORT || 5432,
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
    const { person_id, reviewStars, pros, cons, unit_id, review } = req.body
   
    pool.query('INSERT INTO reviews (person_id, reviewStars, pros, cons, unit_id, review) VALUES ($1, $2, $3, $4, $5, $6)', [person_id, reviewStars, pros, cons, unit_id, review], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).json("Successfully submitted review")
    })
}

const idLookup = (req, res) => {
    let nameID = -1; 
    let name = req.query.name;
    pool.query('SELECT person_id FROM people WHERE name LIKE $1', [name], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows[0]) {
            nameID = results.rows[0].person_id
            
        }
        res.status(200).json(nameID)
    })
    
}

const addUser = (req, res) => {
    let name = req.body.name
    pool.query('INSERT INTO people (name) VALUES ($1)', [name], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).json('Added new person')
    })
}

module.exports = {
    getReviews,
    submitReview,
    idLookup,
    addUser
}
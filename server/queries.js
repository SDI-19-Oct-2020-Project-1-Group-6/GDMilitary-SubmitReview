const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'submittedDatabase',
    database: 'reviews',
    password: 'password',
    port: 5432
})

const submitReview = (req, res) => {
    const { user, rating, pro, con, unit } = req.body

    let userId = -1
    pool.query('SELECT user FROM users WHERE ')
}
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlTxt = `SELECT "name" FROM "questions" ORDER BY random();`; //Randomly order the rows upon calling
    pool.query(sqlTxt)
    .then(result => {
        console.log(result);
    }).catch(err => {
        console.log('Error getting all questions', err);
        res.sendStatus(500);
    })
})


module.exports = router;
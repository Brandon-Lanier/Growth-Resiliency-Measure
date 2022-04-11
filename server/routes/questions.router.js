const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlTxt = `SELECT * FROM "questions" ORDER BY random();`; //Randomly order the rows upon calling
    pool.query(sqlTxt)
    .then(result => {
        console.log(result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error getting all questions', err);
        res.sendStatus(500);
    })
});

// router.post('/', (req, res) => {
//     const answers = req.body;
//     const qryTxt = `INSERT INTO "scores" ()`
// })


module.exports = router;
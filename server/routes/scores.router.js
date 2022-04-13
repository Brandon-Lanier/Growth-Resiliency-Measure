const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET scores
router.get('/', (req, res) => {
    // GET route code here
});

let currentDate = new Date();
// POST scores
router.post('/', async (req, res) => {
    const answers = req.body;
    const qualitative = answers[8].qualitative;
    answers.pop();
    const scores = Object.assign({}, ...answers);
    console.log('scores', scores);
    const user = req.user.id;
    const date = currentDate;
    const batch = 2;
    const connection = await pool.connect();
    try {
    await connection.query('BEGIN');
    const qryTxt = `
    INSERT INTO "scores" ("userId", "assessmentBatchId", "questionId", "score", "scoreQualitative", "date")
    VALUES ($1, $2, $3, $4, $5, $6)
    ;`;
    for (let key in scores) {
        await connection.query(qryTxt, [user, batch, key, scores[key], qualitative, date])
            }
    await connection.query('COMMIT')
    res.sendStatus(200);
    }catch(error) {
    await connection.query('ROLLBACK');
    console.log('error in post', error);
    res.sendStatus(500)
    } finally {
        connection.release();
      }
})






//     for (let key in scores) {
//         pool.query(qryTxt, [user, batch, key, scores[key], qualitative, date])
//     }
//     .then(result => {
//         res.sendStatus(200);
//     }).catch(err => {
//         res.sendStatus(500);
//     })
// })

    
//     for (let key in scores) {
//         pool.query(qryTxt, [user, batch, key, scores[key], qualitative, date])
//     }
//     .then(result => {
//         res.sendStatus(200);
//     }).catch(err => {
//         res.sendStatus(500);
//     })
// })
    // const qryTxt = `
    // INSERT INTO "scores" ("userId", "assessmentBatchId", "questionId", "score", "scoreQualitative", "date")
    // VALUES ($1, $2, $3, $4, $5, $6, $7)
    // ;`
    // pool.query(qryTxt, [user, answers.batch, answers.id, scores, answers.qualitative, date])
    //     .then(result => {
    //         res.sendStatus(201)
    //     }).catch(err => {
    //         console.log('Error in question post route', err);
    //         res.sendStatus(500);
    //     })


module.exports = router;

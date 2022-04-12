const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// GET scores
router.get('/', (req, res) => {
    // GET route code here
});

let currentDate = new Date();
// POST scores
router.post('/', (req, res) => {
    const answers = req.body;
    const scores = answers.flat();
    console.log('scores are', scores)
    const user = req.user.id;
    const date = currentDate;
    const qryTxt = `
    INSERT INTO "scores" ("userId", "assessmentBatchId", "questionId", "score", "scoreQualitative", "date")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ;`
    pool.query(qryTxt, [user, answers.batch, answers.id, scores, answers.qualitative, date])
        .then(result => {
            res.sendStatus(201)
        }).catch(err => {
            console.log('Error in question post route', err);
            res.sendStatus(500);
        })
})

module.exports = router;

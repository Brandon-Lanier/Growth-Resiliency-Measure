const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlTxt = `SELECT * FROM "questions" ORDER BY "measureName" ASC;`; //Randomly order the rows upon calling
    pool.query(sqlTxt)
    .then(result => {
        console.log(result.rows);
        res.send(result.rows)
    }).catch(err => {
        console.log('Error getting all questions', err);
        res.sendStatus(500);
    })
});



// this post is under development // Awaiting info on how the client side will send data.
let currentDate = new Date();

router.post('/', (req, res) => {
    const answers = req.body;
    const user = req.user.id;
    const date = currentDate;
    const qryTxt = `
    INSERT INTO "scores" ("userId", "assessmentBatchId", "questionId", "score", "scoreQualitative", "date")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ;`
    pool.query(qryTxt, [user, answers.batch, answers.id, answers.score, answers.qualitative, date ])
    .then(result => {
        res.sendStatus(201)
    }).catch(err => {
        console.log('Error in question post route', err);
        res.sendStatus(500);
    })
})

// CREATE TABLE "scores" (
// 	"id" SERIAL NOT NULL,
// 	"userId" integer NOT NULL,
// 	"assessmentBatchId" integer NOT NULL,
// 	"questionId" integer NOT NULL,
// 	"score" integer NOT NULL,
// 	"scoreQualitative" TEXT NOT NULL,
// 	"date" DATE NOT NULL,
// 	CONSTRAINT "scores_pk" PRIMARY KEY ("id")
// ) WITH (
//   OIDS=FALSE
// );

module.exports = router;
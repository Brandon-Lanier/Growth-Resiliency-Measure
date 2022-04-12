const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlTxt = `SELECT * FROM "questions" ORDER BY id ASC;`; //Randomly order the rows upon calling
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
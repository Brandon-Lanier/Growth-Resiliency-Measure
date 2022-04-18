const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// GET average score for each measure sorted by assessment batch id.  
// This is used for students to view their own previous results.
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const qryTxt = `
    SELECT "questions"."measureName" AS "measure", avg("scores"."score") AS "avgScore", "scores"."assessmentBatchId" FROM "scores"
    JOIN "questions" ON "questions"."id" = "scores"."questionId"
    WHERE "scores"."userId" = $1
    GROUP BY "questions"."measureName", "scores"."assessmentBatchId"
    ORDER BY "measure"`;
    pool.query(qryTxt, [req.user.id])
      .then((result) => {
        res.send(result.rows);
        console.log("result", result.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

let currentDate = new Date();
// POST scores for individual student after taking test
router.post("/", async (req, res) => {
  if (req.isAuthenticated()) {
    const batch = req.body[0]; //Batch id from user
    const answers = req.body[1]; //All answers in an array
    const qualitative = answers[8].qualitative; //pulling the qualitative answer out of the array
    answers.pop();
    const scores = Object.assign({}, ...answers); //create a single object to iterate through all answers
    const user = req.user.id;
    const date = currentDate; //grab todays date
    const connection = await pool.connect();
    try {
      await connection.query("BEGIN");
      const qryTxt = `
    INSERT INTO "scores" ("userId", "assessmentBatchId", "questionId", "score", "scoreQualitative", "date")
    VALUES ($1, $2, $3, $4, $5, $6)
    ;`;
      for (let key in scores) {
        await connection.query(qryTxt, [
          user,
          batch,
          key,
          scores[key],
          qualitative,
          date,
        ]);
      }
      await connection.query("COMMIT");
      res.sendStatus(200);
    } catch (error) {
      await connection.query("ROLLBACK");
      console.log("error in post", error);
      res.sendStatus(500);
    } finally {
      connection.release();
    }
  } else {
    res.sendStatus(403);
  }
});

router.get("/adminStudent/:id", (req, res) => {
  console.log('req.params.id is', req.params.id)
  if (req.isAuthenticated()) {
    
    const qryTxt = `
    SELECT "questions"."measureName" AS "measure", avg("scores"."score") AS "avgScore", "scores"."assessmentBatchId" FROM "scores"
    JOIN "questions" ON "questions"."id" = "scores"."questionId"
    WHERE "scores"."userId" = $1
    GROUP BY "questions"."measureName", "scores"."assessmentBatchId"
    ORDER BY "measure"`;
    pool.query(qryTxt, [req.params.id])
      .then((result) => {
        res.send(result.rows);
        console.log("result", result.rows);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});
module.exports = router;

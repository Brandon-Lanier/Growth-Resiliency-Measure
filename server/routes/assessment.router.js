const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

let currentDate = new Date();

// Pull all assessments for admin
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        const qryTxt = `SELECT * FROM "assessmentBatches";`;
        pool.query(qryTxt).then(result => {res.send(result.rows)}).catch(error => {res.sendStatus(500)})
    } else {
        res.sendStatus(403);
    }
})


//Pull all completed assessments for an active admin batch
router.get("/adminbatch", async (req, res) => {
  if (req.isAuthenticated()) {
    const checkActiveSql = `SELECT * FROM "assessmentBatches" WHERE $1 <= "endDate";`;
    let assessments = await pool.query(checkActiveSql, [currentDate]);

    // row below will break my server - bp April 18th
    // console.log("assesssment id", assessments.rows[0].id);

    // check the scores table to see if a student has taken the test.
    const checkQry = `SELECT "students"."userId", "students"."firstName", "students"."lastName", "scores"."assessmentBatchId", "scores"."date" FROM "students"
        JOIN "scores" ON "students"."userId" = "scores"."userId"
        WHERE "scores"."assessmentBatchId" = 1
        GROUP BY "students"."userId", "students"."firstName", "students"."lastName", "scores"."assessmentBatchId", "scores"."date";
        ;`;
    const completedStudents = await pool.query(checkQry);
    try {
      res.send(completedStudents.rows); // This will send back all the students that have completed the active assessment
    } catch (error) {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;

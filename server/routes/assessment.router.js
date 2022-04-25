const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

let currentDate = new Date();
let lastDate = new Date(+new Date() + 12096e5);

// Pull all assessments for admin
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    const qryTxt = `SELECT * FROM "assessmentBatches";`;
    pool
      .query(qryTxt)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

// Pulls the active assessment details
router.get("/activeassessment", (req, res) => {
  if (req.isAuthenticated()) {
    const checkActiveSql = `SELECT * FROM "assessmentBatches" WHERE $1 <= "endDate" AND $2 >= "startDate";`;
    pool
      .query(checkActiveSql, [currentDate, lastDate])
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//Pull all completed assessments for an active admin batch
router.get("/adminbatch", async (req, res) => {
  let completedStudents = []
  if (req.isAuthenticated()) {
    console.log("lastDate", lastDate);
    const checkActiveSql = `SELECT * FROM "assessmentBatches" WHERE $1 <= "endDate" AND $2 >= "startDate";`;
    let assessments = await pool.query(checkActiveSql, [currentDate, lastDate]);
    // console.log("assesssment id", assessments.rows[0].id);

    // check the scores table to see if a student has taken the test.
    if (assessments.rows.length !== 0) {
    const checkQry = `SELECT "students"."userId", "students"."firstName", "students"."lastName", "scores"."assessmentBatchId", "scores"."date" FROM "students"
        JOIN "scores" ON "students"."userId" = "scores"."userId"
        JOIN "assessmentBatches" ON "assessmentBatches"."id" = "scores"."assessmentBatchId"
        WHERE "scores"."assessmentBatchId" = $1 AND "scores"."date" <= "assessmentBatches"."endDate"
        GROUP BY "students"."userId", "students"."firstName", "students"."lastName", "scores"."assessmentBatchId", "scores"."date";
        ;`;   
     completedStudents = await pool.query(checkQry, [assessments.rows[0].id]);
    } else  completedStudents = []
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

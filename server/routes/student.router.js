const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET ALL STUDENTS AND INFO
 */
router.get('/', (req, res) => {
  const sqlText = `SELECT "students"."id", "students"."firstName", "students"."lastName", "students"."eip","students"."graduationYear", "students"."email", "students"."studentId","name", "race"."race", "genders"."gender", "lunchStatus"."status"
  FROM "students"
  JOIN "schools" ON "schools"."id" = "students"."schoolId"
  JOIN "genders" ON "genders"."id" = "students"."gender"
  JOIN "race" ON "race"."id"= "students"."race"
  JOIN "lunchStatus" ON "lunchStatus"."id"="students"."lunchStatus"
  GROUP BY "students"."firstName", "students"."lastName", "students"."graduationYear", "schools"."name", "race"."race", "genders"."gender", "lunchStatus"."status", "students"."eip", "students"."email", "students"."studentId", "students"."id";`
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
      }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

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
);

/**
 * PUT route template
 */
router.put('/editstudent/:id', (req, res) => {
  console.log('EDIT STUDENT PUT HIT!')
  const idToUpdate = req.params.id;
  console.log(req.body.firstName)
  console.log(idToUpdate)
  const sqlText = ` UPDATE "students" SET "firstName" = $1, "lastName" = $2, "email" = $3, "eip" = $4, "studentId" = $5
  WHERE id = $6;
`
  pool.query(sqlText, [req.body.firstName, req.body.lastName, req.body.email, req.body.eip, req.body.studentId, idToUpdate])
      .then((result) => {
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
});

module.exports = router;
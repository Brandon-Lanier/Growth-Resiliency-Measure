const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ------------------------------Post Route for student CSV import/upload---------------------------
router.post('/', (req, res) => {
  let queryText = `INSERT INTO "students" ("userId", "studentId", "firstName", "lastName", "graduationYear", "email", "race", "eip", "gender"
  , "lunchStatus", "schoolId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

  let queryInserts = [
    req.body.userId,
    req.body.studentId,
    req.body.firstName,
    req.body.lastName,
    req.body.graduationYear,
    req.body.email,
    req.body.race,
    req.body.eip,
    req.body.gender,
    req.body.lunchStatus,
    req.body.schoolId
  ];
  if (req.isAuthenticated()) {
    pool.query(queryText, queryInserts)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in post', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
}); // End Post route 

module.exports = router;

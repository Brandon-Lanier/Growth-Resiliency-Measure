const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// ------------------------------Post Route for student CSV import/upload---------------------------
router.post('/', (req, res) => {
  console.log("post route hit server side")
  console.log(req.body.array)
  let queryText = `INSERT INTO "students" ("userId", "studentId", "firstName", "lastName", "graduationYear", "email", "race", "eip", "gender", "lunchStatus", "schoolId") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`

  let queryInserts = [
    req.body.array[0].userId,
    req.body.array[0].studentId,
    req.body.array[0].firstName,
    req.body.array[0].lastName,
    req.body.array[0].graduationYear,
    req.body.array[0].email,
    req.body.array[0].race,
    req.body.array[0].eip,
    req.body.array[0].gender,
    req.body.array[0].lunchStatus,
    req.body.array[0].schoolId,
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

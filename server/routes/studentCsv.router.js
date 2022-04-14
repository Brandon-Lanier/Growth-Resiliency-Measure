const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// ------------------------------Post Route for student CSV import/upload---------------------------
router.post("/", async (req, res) => {

  const connection = await pool.connect();

  try {
    
  }
  console.log("post route hit server side");
  console.log(req.body);
  let queryText = `INSERT INTO "students" ("studentId", "firstName", "lastName", "graduationYear", "email", "race", "eip", "gender", "lunchStatus", "schoolId") 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

  let queryInserts = [
    req.body.studentId,
    req.body.firstName,
    req.body.lastName,
    req.body.graduationYear,
    req.body.email,
    req.body.race,
    req.body.eip,
    req.body.gender,
    req.body.lunchStatus,
    req.body.schoolId,
  ];
  if (
    // req.isAuthenticated()
    true
  ) {
    pool
      .query(queryText, queryInserts)
      .then((results) => {
        // Username is email
        const username = req.body.email;

        // Password is studentId + First name
        const password = req.body.studentId + req.body.firstName;

        // Password encryption
        // const password = encryptLib.encryptPassword(req.body.array[0].studentId + req.body.array[0].firstName);

        console.log("username is", username);
        console.log("password is", password);

        const queryUserText = `INSERT INTO "user" (username, password)
        VALUES ($1, $2) RETURNING id;`;

        pool
          .query(queryUserText, [username, password])
          .then((result) => {
            console.log("id is", result.rows[0].id);
            // form relationship between student and user table
            const studentIdInsert = `INSERT INTO "students" ("userId")
           VALUES ($1) WHERE studentId = $2;`;
            const queryInsert = [result.rows[0].id, req.body.studentId];

            pool
              .query(studentIdInsert, queryInsert)
              .then(() => res.sendStatus(201))
              .catch((err) => {
                console.log("Failed on relationship build");

                res.sendStatus(500);
              });

            res.sendStatus(201);
          })

          .catch((err) => {
            console.log("User registration failed: ", err);
            res.sendStatus(500);
          });

        res.sendStatus(200);
      })
      .catch((error) => {
        console.log("error in post", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
}); // End Post route

module.exports = router;

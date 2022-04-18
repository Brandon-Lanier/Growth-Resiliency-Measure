const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");

// Theoretically adds admins via CSV uploads. HASN'T NOT BEEN THOROUGHLY TESTED YET

router.post("/", async (req, res) => {
  const connection = await pool.connect();

  // NEEDS AUTHENTICATION 

  try {
    await connection.query("BEGIN");
    console.log("post route hit server side");
    console.log("req.body is", req.body);

    // Username is email
    const username = req.body.email;

    console.log("username is", username);

    // checks if user is already generated
    const checkUsername = await connection.query(
      `SELECT * FROM "user" WHERE username = '${username}';`
    );

    console.log("checkUsername is", checkUsername.rows);


    // NEEDS WORK HERE
    if (checkUsername.rows.length > 0) {
      console.log('INSIDE IF STATEMENT');
      
      await connection.query("ROLLBACK");
      connection.release();
      console.log("Rolling Back - username taken");
      res.sendStatus(500);
    }

    // Password encryption
    const password = encryptLib.encryptPassword(
      req.body.firstName + req.body.lastName
    );

    console.log("username is", username);
    console.log("password is", password);

    const sqlAddUser = `INSERT INTO "user" (username, password)
      VALUES ($1, $2) RETURNING id;`;

    const userId = await connection.query(sqlAddUser, [username, password]);

    let sqlAddAdmin = `INSERT INTO "admin" ("userId","firstName","lastName","email","schoolId") 
    VALUES ($1, $2, $3, $4, $5)`;

    let queryInserts = [
      userId.rows[0].id,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.schoolId,
    ];

    await connection.query(sqlAddAdmin, queryInserts);

    await connection.query("COMMIT");
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log("Rolling Back", error);
    res.sendStatus(500);
  } finally {
    connection.release();
    res.sendStatus(200);
  }
}); // End Post route

// Send back a list of all admins, all schools, for the superadmin
router.get("/", (req, res) => {
  let queryText = `SELECT "admin"."id", "admin".email, "admin"."firstName", "admin"."lastName", "schools"."name", "schools"."id" AS "school_id" FROM "admin"
  JOIN "schools" on "admin"."schoolId" = schools.id; `;

  pool
    .query(queryText)
    .then((result) => {
      console.log("result.rows is", result.rows);
      const admins = result.rows;
      pool.query(`SELECT * FROM "schools";`).then((result) => {
        console.log("schools are", result.rows);
        const schools = result.rows;
        res.send({ admins: admins, schools: schools });
      });
    })
    .catch((err) => {
      console.log("Error is", err);
      res.sendStatus(500);
    });
});

router.delete("/:id", (req, res) => {
  const queryText = `DELETE FROM "admin" WHERE id = $1;`;

  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error is", err);
      res.sendStatus(500);
    });
});

module.exports = router;

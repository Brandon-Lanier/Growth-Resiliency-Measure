const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");


router.post("/", async (req, res) => {

  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");
    console.log("post route hit server side");
    console.log("req.body is", req.body);

    // Username is email
    const username = req.body.email;

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

module.exports = router;

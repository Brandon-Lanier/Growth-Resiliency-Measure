const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");


// ------------------------------Post Route for student CSV import/upload---------------------------
router.post("/", async (req, res) => {
  const connection = await pool.connect();

// ==== NEED TO ADD IS AUTHENTICATED ====

  try {
    await connection.query('BEGIN');
    console.log("post route hit server side");
    console.log('req.body is', req.body);
    
    // CREATE NEW USER LOOP ================== 
    for (let student of req.body.studentArray){

    // Username is email
      const username = student.email;
      
      // Password encryption
      const password = encryptLib.encryptPassword(student.firstName + student.studentId);
      
      console.log("username is", username);
      console.log("password is", password);
      
      const sqlAddUser = `INSERT INTO "user" (username, password)
      VALUES ($1, $2) RETURNING id;`;
      
      const userId = await connection.query(sqlAddUser, [username, password]);
      
      
      /// ======= INSERT INTO STUDENTS TABLE WITH RETURNED ID
      
      const sqlAddStudent = `INSERT INTO "students" ("userId","studentId", "firstName", "lastName", "graduationYear", "email", "race", "eip", "gender", "lunchStatus", "schoolId") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
      
      let queryInserts = [
        userId.rows[0].id,
        student.studentId,
        student.firstName,
        student.lastName,
        student.graduationYear,
        student.email,
        student.race,
        student.eip,
        student.gender,
        student.lunchStatus,
        student.schoolId,
      ];
      await connection.query(sqlAddStudent, queryInserts);
    }
    await connection.query('COMMIT');
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

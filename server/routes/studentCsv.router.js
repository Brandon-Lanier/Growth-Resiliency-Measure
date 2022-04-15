const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const { batch } = require("react-redux");


//-------------------------------Get route for student CSV export-----------------------------------
// router.get('/', (req, res) => {
//     console.log('in router.get')
//     const qryTxt = `
//       SELECT * From "scores";`;
//     pool.query(qryTxt)
//       .then((result) => {
//         res.send(result.rows); 
//         console.log('result', result.rows);

//       })
//       .catch((err) => {
//         res.sendStatus(500);
//       });

// }); // end Get student Csv export---


//-------------------------------Get route for student CSV export-----------------------------------
router.get('/', async (req, res) => {

  // pulling students ids from db
  const studentQryTxt = `
  SELECT "students"."studentId"
  FROM "students";`;
  const studentsData = await pool.query(studentQryTxt);
  const students = studentsData.rows

  // pulling batch ids from db
  const batchQryTxt = `
  SELECT "batchNumber" FROM "assessmentBatches";`;
  const batchesData = await pool.query(batchQryTxt);
  const batches = batchesData.rows

  // pulling students scores from db
  const scoreQryTxt = `
  SELECT "scores"."userId", "scores"."score", "scores"."assessmentBatchId", "questions"."measureName", "students"."firstName", "students"."lastName", "students"."graduationYear", "students"."studentId", "questions"."id" AS "questionId"
  FROM "scores"
  JOIN "students" ON "students"."userId" = "scores"."userId"
  JOIN "questions" ON "questions"."id" = "scores"."questionId";`;
  const scoresData = await pool.query(scoreQryTxt);
  const scores = scoresData.rows




  // // creating objects for each students which contain answers for each student score
  // for (let student of students) {
  //   let aggScore = {
  //     id: student.studentId,
  //     1: '',
  //     2: '',
  //     3: '',
  //     4: '',
  //     5: '',
  //     6: '',
  //     7: '',
  //     8: '',
  //     9: '',
  //     10: '',
  //     11: '',
  //     12: '',
  //     13: '',
  //     14: '',
  //     15: '',
  //     16: '',
  //     17: '',
  //     18: '',
  //     19: '',
  //     20: '',
  //     21: '',
  //     22: '',
  //     23: '',
  //     24: '',
  //     25: '',
  //     26: '',
  //     27: '',
  //   }
  //   for (score of scores) {
  //     if (score.studentId === student.studentId) {
  //       aggScore[score.questionId] = score.score
  //     }
  //   }
  //   allScores.push(aggScore);
  // }
  // console.log(allScores);


  // write down expected result
  // clear up student router duplicate

  let allScores = []

  for (let student of students) {
    let studentObj = {
      studentId: student.studentId,
      batches: []
    }
    // console.log('studentObj is', studentObj)
    for (let batch of batches) {
      let batchObj = {
        batchId: batch.batchNumber,
        scores: {
          1: '',
          2: '',
          3: '',
          4: '',
          5: '',
          6: '',
          7: '',
          8: '',
          9: '',
          10: '',
          11: '',
          12: '',
          13: '',
          14: '',
          15: '',
          16: '',
          17: '',
          18: '',
          19: '',
          20: '',
          21: '',
          22: '',
          23: '',
          24: '',
          25: '',
          26: '',
          27: ''
        }
      }
      for (score of scores) {
        if (score.studentId === student.studentId && score.assessmentBatchId === batch.batchNumber) {
          batchObj.scores[score.questionId] = score.score
        }
      }
      // console.log('batchObj is', batchObj)
      studentObj.batches.push(batchObj)
    }
    // console.log(studentObj)
    allScores.push(studentObj)
  }

  // sends batch id or 'none'
  try {
    res.send(allScores);
  } catch (err) {
    res.sendStatus(500);
  }

  // .then((result) => {
  // console.log('result', result.rows);

  // })
  // .catch((err) => {
  // res.sendStatus(500);
  // });

}); // end Get student Csv export---

// ------------------------------Post Route for student CSV import/upload---------------------------
router.post("/", async (req, res) => {
  const connection = await pool.connect();

  // ==== NEED TO ADD IS AUTHENTICATED ====

  try {
    await connection.query('BEGIN');
    console.log("post route hit server side");
    console.log('req.body is', req.body);

    // CREATE NEW USER LOOP ================== 
    for (let student of req.body.studentArray) {

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

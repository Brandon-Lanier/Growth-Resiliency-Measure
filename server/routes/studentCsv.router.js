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
  SELECT "scores"."userId", "scores"."score", "scores"."scoreQualitative", "scores"."assessmentBatchId", "questions"."measureName", "students"."firstName", "students"."lastName", "students"."graduationYear", "students"."studentId", "questions"."id" AS "questionId"
  FROM "scores"
  JOIN "students" ON "students"."userId" = "scores"."userId"
  JOIN "questions" ON "questions"."id" = "scores"."questionId";`;
  const scoresData = await pool.query(scoreQryTxt);
  const scores = scoresData.rows

  // creating strings for numbers since object properties need to be referenced through strings
  let one = 1;
  let two = 2;
  let three = 3;
  let four = 4;
  let five = 5;
  let six = 6;
  let seven = 7;
  let eight = 8;
  let nine = 9;
  let ten = 10;
  let eleven = 11;
  let twelve = 12;
  let thirteen = 13;
  let fourteen = 14;
  let fifteen = 15;
  let sixteen = 16;
  let seventeen = 17;
  let eighteen = 18;
  let nineteen = 19;
  let twenty = 20;
  let twentyOne = 21;
  let twentyTwo = 22;
  let twentyThree = 23;
  let twentyFour = 24;
  let twentyFive = 25;
  let twentySix = 26;
  let twentySeven = 27;
  
  // creating objects for each student for each batch which contain answers for each question
  let allScores = []
  for (let student of students) {
    let studentObj = {
      studentId: student.studentId,
      batches: []
    }
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
          if (score.questionId != 27) {
            batchObj.scores[score.questionId] = score.score
          } else {
            // console.log(qualitative)
            batchObj.scores[twentySeven] = score.scoreQualitative
          }
        }
      }
      let batchAverage = {
        batchId: batchObj.batchId,
        scores: {
          balanced: (batchObj.scores[one] + batchObj.scores[two] + batchObj.scores[three]) / 3,
          selfConfidence: (batchObj.scores[four] + batchObj.scores[five]) / 2,
          understandingAdaptability: (batchObj.scores[six] + batchObj.scores[seven] + batchObj.scores[eight]) / 3,
          connection: (batchObj.scores[nine] + batchObj.scores[ten] + batchObj.scores[eleven] + batchObj.scores[twelve]+ batchObj.scores[thirteen]) / 5,
          contribution: (batchObj.scores[fourteen] + batchObj.scores[fifteen]) / 2,
          empathy: (batchObj.scores[sixteen] + batchObj.scores[seventeen] + batchObj.scores[eighteen] + batchObj.scores[nineteen]) / 4,
          selfExpression: (batchObj.scores[twenty] + batchObj.scores[twentyOne] + batchObj.scores[twentyTwo]) / 3,
          selfControl: (batchObj.scores[twentyThree] + batchObj.scores[twentyFour] + batchObj.scores[twentyFive] + batchObj.scores[twentySix]) / 4,
          qualitative: batchObj.scores[twentySeven]
        }
      }
      // console.log(batchAverage);
      studentObj.batches.push(batchAverage);
    }
    allScores.push(studentObj)
  }


  // sends aggregate scores for each measure, for each student, for each batch
  try {
    res.send(allScores);
  } catch (err) {
    res.sendStatus(500);
  }

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

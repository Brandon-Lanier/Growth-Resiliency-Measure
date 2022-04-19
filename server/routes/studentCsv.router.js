const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const nodemailer = require('nodemailer');

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const { batch } = require("react-redux");
const { default: axios } = require("axios");


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN
  }
});




//-------------------------------Get route for student CSV export averaged scores-----------------------------------
// sends average scores by measure for each student and assessment
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

  // creating objects for each student for each batch which contain answers for each question
  let allScores = []
  for (let student of students) {
    for (let batch of batches) {
      let batchObj = {
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
      for (score of scores) {
        if (score.studentId === student.studentId && score.assessmentBatchId === batch.batchNumber) {
          if (score.questionId != 27) {
            batchObj[score.questionId] = score.score
          } else {
            batchObj[27] = score.scoreQualitative
          }
        }
      }

      let studentObj = {
        studentId: student.studentId,
        batchId: batch.batchNumber,
        balanced: (batchObj[1] + batchObj[2] + batchObj[3]) / 3,
        selfConfidence: (batchObj[4] + batchObj[5]) / 2,
        understandingAdaptability: (batchObj[6] + batchObj[7] + batchObj[8]) / 3,
        connection: (batchObj[9] + batchObj[10] + batchObj[11] + batchObj[12]+ batchObj[13]) / 5,
        contribution: (batchObj[14] + batchObj[15]) / 2,
        empathy: (batchObj[16] + batchObj[17] + batchObj[18] + batchObj[19]) / 4,
        selfExpression: (batchObj[20] + batchObj[21] + batchObj[22]) / 3,
        selfControl: (batchObj[23] + batchObj[24] + batchObj[25] + batchObj[26]) / 4,
        qualitative: batchObj[27]
      }
      allScores.push(studentObj)
    }
  }


  // sends aggregate scores for each measure, for each student, for each batch
  try {
    res.send(allScores);
  } catch (err) {
    res.sendStatus(500);
  }

}); // end Get student Csv export NESTED OBJECTS---

// ------------------------------Post Route for student CSV import/upload---------------------------
router.post("/", async (req, res) => {
  const connection = await pool.connect();

  // ==== NEED TO ADD IS AUTHENTICATED ====

  try {
    await connection.query('BEGIN');
    console.log("post route hit server side");
    console.log('req.body is', req.body);

    let passwordArray = [];

    // CREATE NEW USER LOOP ================== 
    for (let student of req.body.studentArray) {

      // Username is email
      const username = student.email;

      // gets a simple password from the dino pass api 
      
      let password = await axios.get('https://www.dinopass.com/password/simple'); 
      console.log('password is', password.data);
      

      //Need to check if this is individual or CSV upload. Individual student will have entered a password
      // if (student.password.length > 0){
      //   console.log('inside submtted passworld', student.password);
      //   password = encryptLib.encryptPassword(student.password);
        
      // } else {
        // Password encryption
        EncryptedPassword = encryptLib.encryptPassword(password.data);
      // }



      console.log("username is", username);
      console.log("password is", EncryptedPassword);

      const sqlAddUser = `INSERT INTO "user" (username, password)
      VALUES ($1, $2) RETURNING id;`;

      const userId = await connection.query(sqlAddUser, [username, EncryptedPassword]);


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

      passwordArray.push({email:student.email, password:password.data})
    }
    await connection.query('COMMIT');

    for (let user of passwordArray){

      // setting up our mail options 
      let mailOptions = {
        from: 'growthresiliencymeasure@gmail.com',
        to: user.email,
        subject: 'Nodemailer Project',
        text: `Hi from your nodemailer project. Your password is: ${user.password}`
      };
      
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      });
    }
      

  } catch (error) {
    await connection.query("ROLLBACK");
    console.log("Rolling Back", error);
    res.sendStatus(500);
  } finally {
    connection.release();
    res.sendStatus(200);
  }
}); // End Post route


// // NOT CURRENTLY USING ROUTES BELOW
// //-------------------------------Get route for scores CSV export-----------------------------------
// // sends scores table
// router.get('/scores', (req, res) => {
//   console.log('in router.get')
//   const qryTxt = `
//     SELECT * From "scores";`;
//   pool.query(qryTxt)
//     .then((result) => {
//       res.send(result.rows); 
//       console.log('result', result.rows);

//     })
//     .catch((err) => {
//       res.sendStatus(500);
//     });

// }); // end Get student Csv export---


// //-------------------------------Get route for student average scores NESTED OBJECTS-----------------------------------
// // sends average scores by measure for each student and assessment
// router.get('/nestedObjects', async (req, res) => {

// // pulling students ids from db
// const studentQryTxt = `
// SELECT "students"."studentId"
// FROM "students";`;
// const studentsData = await pool.query(studentQryTxt);
// const students = studentsData.rows

// // pulling batch ids from db
// const batchQryTxt = `
// SELECT "batchNumber" FROM "assessmentBatches";`;
// const batchesData = await pool.query(batchQryTxt);
// const batches = batchesData.rows

// // pulling students scores from db
// const scoreQryTxt = `
// SELECT "scores"."userId", "scores"."score", "scores"."scoreQualitative", "scores"."assessmentBatchId", "questions"."measureName", "students"."firstName", "students"."lastName", "students"."graduationYear", "students"."studentId", "questions"."id" AS "questionId"
// FROM "scores"
// JOIN "students" ON "students"."userId" = "scores"."userId"
// JOIN "questions" ON "questions"."id" = "scores"."questionId";`;
// const scoresData = await pool.query(scoreQryTxt);
// const scores = scoresData.rows

// // creating objects for each student for each batch which contain answers for each question
// let allScores = []
// for (let student of students) {
//   let studentObj = {
//     studentId: student.studentId,
//     batches: []
//   }
//   for (let batch of batches) {
//     let batchObj = {
//       batchId: batch.batchNumber,
//       scores: {
//         1: '',
//         2: '',
//         3: '',
//         4: '',
//         5: '',
//         6: '',
//         7: '',
//         8: '',
//         9: '',
//         10: '',
//         11: '',
//         12: '',
//         13: '',
//         14: '',
//         15: '',
//         16: '',
//         17: '',
//         18: '',
//         19: '',
//         20: '',
//         21: '',
//         22: '',
//         23: '',
//         24: '',
//         25: '',
//         26: '',
//         27: ''
//       }
//     }
//     for (score of scores) {
//       if (score.studentId === student.studentId && score.assessmentBatchId === batch.batchNumber) {
//         if (score.questionId != 27) {
//           batchObj.scores[score.questionId] = score.score
//         } else {
//           batchObj.scores[27] = score.scoreQualitative
//         }
//       }
//     }
//     let batchAverage = {
//       batchId: batchObj.batchId,
//       scores: {
//         balanced: (batchObj.scores[1] + batchObj.scores[2] + batchObj.scores[3]) / 3,
//         selfConfidence: (batchObj.scores[4] + batchObj.scores[5]) / 2,
//         understandingAdaptability: (batchObj.scores[6] + batchObj.scores[7] + batchObj.scores[8]) / 3,
//         connection: (batchObj.scores[9] + batchObj.scores[10] + batchObj.scores[11] + batchObj.scores[12]+ batchObj.scores[13]) / 5,
//         contribution: (batchObj.scores[14] + batchObj.scores[15]) / 2,
//         empathy: (batchObj.scores[16] + batchObj.scores[17] + batchObj.scores[18] + batchObj.scores[19]) / 4,
//         selfExpression: (batchObj.scores[20] + batchObj.scores[21] + batchObj.scores[22]) / 3,
//         selfControl: (batchObj.scores[23] + batchObj.scores[24] + batchObj.scores[25] + batchObj.scores[26]) / 4,
//         qualitative: batchObj.scores[27]
//       }
//     }
//     studentObj.batches.push(batchAverage);
//   }
//   allScores.push(studentObj)
// }


// // sends aggregate scores for each measure, for each student, for each batch
// try {
//   res.send(allScores);
// } catch (err) {
//   res.sendStatus(500);
// }

// }); // end Get student Csv export NESTED OBJECTS---

module.exports = router;

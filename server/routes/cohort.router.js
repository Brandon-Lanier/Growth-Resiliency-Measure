const { SquareOutlined } = require('@mui/icons-material');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/', async (req, res) => {

console.log('Receieved post, body is', req.body);

// This sql text grabs the school id of the admin making the request
const schoolIdquery = `SELECT "schoolId" FROM admin
JOIN "user" ON "user".id = admin."userId"
WHERE "user".id = 1;`;

const schoolId = await pool.query(schoolIdquery);
console.log('schoolId is', schoolId.rows[0].schoolId);

// This creates two rows, both identical, except for batchNumber which is coded to 1 and 2 consecutively 
const sqlText = `INSERT INTO "assessmentBatches" ("batchNumber","semesterNumber","fiscalYear","schoolId","startDate","endDate")
VALUES ( 1, $1,$2,$3,$4,$5 ), ( 2, $1,$2,$3,$4,$5 );`;

pool.query(sqlText,[req.body.term, req.body.fiscalYear, schoolId.rows[0].schoolId, req.body.startDate, req.body.endDate ])
.then((result) => {
    console.log('success, result is', result);
    res.sendStatus(200);
    
}).catch((err) => {
    console.log('error on assessemnt post', err);
    res.sendStatus(500);
    
})


})



module.exports = router;


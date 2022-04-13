const { SquareOutlined } = require('@mui/icons-material');
const express = require('express');
const { batch } = require('react-redux');
const pool = require('../modules/pool');
const router = express.Router();



router.post('/', async (req, res) => {

    console.log('Received post, body is', req.body);

    // This sql text grabs the school id of the admin making the request
    const schoolIdquery = `SELECT "schoolId" FROM admin
    JOIN "user" ON "user".id = admin."userId"
    WHERE "user".id = $1;`;

    const schoolId = await pool.query(schoolIdquery, [req.user.id]);
    console.log('schoolId is', schoolId.rows[0].schoolId);

    // This creates two rows, both identical, except for batchNumber which is coded to 1 and 2 consecutively 
    const sqlText = `INSERT INTO "assessmentBatches" ("batchNumber","semesterNumber","fiscalYear","schoolId","startDate","endDate")
    VALUES ( 1, $1,$2,$3,$4,$5 ), ( 2, $1,$2,$3,$4,$5 );`;

    pool.query(sqlText, [req.body.term, req.body.fiscalYear, schoolId.rows[0].schoolId, req.body.startDate, req.body.endDate])
        .then((result) => {
            console.log('success, result is', result);
            res.sendStatus(200);

        }).catch((err) => {
            console.log('error on assessemnt post', err);
            res.sendStatus(500);

        })


})

// for student homepage
// returns the batch number for student if they need to take the test
// otherwise returns none
router.get('/studentbatch', async (req, res) => {
    let activeBatch = 'none';
    
    // This sql text grabs the school id of the student logged in
    const schoolIdquery = `SELECT "schoolId" FROM students
    JOIN "user" ON "user".id = students."userId"
    WHERE "user".id = $1;`;
    // WHERE "user".id = $1;`;
    
    // const schoolIdObject = await pool.query(schoolIdquery, [req.user.id]);
    const schoolIdObject = await pool.query(schoolIdquery, [req.user.id]);
    const schoolId = schoolIdObject.rows[0].schoolId;
    console.log('schoolId is', schoolId);
    
    // This grabs all batches for the school
    const batchesQuery = `SELECT * FROM "assessmentBatches" WHERE "schoolId" = $1;`;
    
    const batchesObject = await pool.query(batchesQuery, [schoolId]);
    const batches = batchesObject.rows;
    
    // see if current date falls in the batches timeframe
    // if it is, return batch number
    let currentDate = new Date();
    for(let batch of batches) {
        if(batch.startDate <= currentDate && batch.endDate >= currentDate){
            activeBatch = batch.id;
        }
    }
    console.log('active batch is', activeBatch);

    // sends batch id or 'none'
    try { 
        res.send(activeBatch.toString());
    } catch (err) {
        res.sendStatus(500);
    }  
})


module.exports = router;


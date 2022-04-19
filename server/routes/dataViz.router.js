const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// req.query is
// {
//     schoolId: 1
//     year: '2022',
//     term: '2',
//     batch: '1',
//     grade: 'all',
//     ethnicity: 'all',
//     gender: 'all',
//     eip: 'all'
//     lunchStatus: 'all'
//   }

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.query);
        let termSelector = ''
        let grade = '';
        let race = '';
        let eip = '';
        let gender = '';
        let lunchStatus = '';
        let counter = 3;

        let qryArguments = [
            req.query.schoolId,
            req.query.yearStart,
            req.query.yearEnd
        ]

        switch (req.query.timeFrames) {
            case 'term':
                termSelector = ', "assessmentBatches"."semesterNumber"'
                break;
            // default is 'year'
            default:
                break;
        }

        // check if the req.query has a filter
        // if so, add WHERE text to the pg query text and add parameters to pool.query

        switch (req.query.grade) {
            case 'all':
                break;
            default:
                counter++;

                // check what academic year we are in based on current month
                // new academic year starts September 1st.
                const d = new Date();
                let academicYear = d.getFullYear();
                let month = d.getMonth();
                if (month > 8) {
                    academicYear++
                }

                // figure out what graduation years to filter on based on grade in req.query
                let gradYear = academicYear - req.query.grade + 12;

                console.log('grade is', grade)
                console.log('academicYear is', academicYear)
                console.log('gradYear is', gradYear)

                grade = `AND "students"."graduationYear" = $${counter} `;
                qryArguments.push(gradYear.toString());
                break;
        }

        switch (req.query.ethnicity) {
            case 'all':
                break;
            default:
                counter++;
                race = `AND "students"."race" = $${counter} `;
                qryArguments.push(req.query.ethnicity);
                break;
        }

        switch (req.query.eip) {
            case 'all':
                break;
            default:
                counter++;
                eip = `AND "students"."eip" = $${counter} `;
                qryArguments.push(req.query.eip);
                break;
        }

        switch (req.query.gender) {
            case 'all':
                break;
            default:
                counter++;
                gender = `AND "students"."gender" = $${counter} `;
                qryArguments.push(req.query.gender);
                break;
        }

        switch (req.query.lunchStatus) {
            case 'all':
                break;
            default:
                counter++;
                lunchStatus = `AND "students"."lunchStatus" = $${counter} `;
                qryArguments.push(req.query.lunchStatus);
                break;
        }

        // AND "students"."graduationYear" = 2022

        const qryTextOne = `
        SELECT avg("scores"."score") AS "averageScore", 
        "questions"."measureName",
        "assessmentBatches"."fiscalYear"
        ${termSelector}
        FROM "scores"
        JOIN "students" ON "scores"."userId" = "students"."userId"
        JOIN "assessmentBatches" ON "assessmentBatches"."schoolId" = "students"."schoolId"
        JOIN "questions" ON "scores"."questionId" = "questions"."id"
        WHERE "students"."schoolId" = $1
        AND "assessmentBatches"."fiscalYear" BETWEEN $2 AND $3`;

        const qryTextTwo = grade + race + eip + gender + lunchStatus;

        const qryTextThree = `
        AND "questions"."measureName" <> 'Qualitative'
        GROUP BY "questions"."measureName",
        "assessmentBatches"."fiscalYear"
        ${termSelector}
        `;


        console.log('qryText', qryTextOne + qryTextTwo + qryTextThree)
        console.log('qryArguments is', qryArguments)

        pool.query(qryTextOne + qryTextTwo + qryTextThree, qryArguments)
            .then((result) => {
                res.send(result.rows);
                console.log("result", result.rows);
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});




module.exports = router;
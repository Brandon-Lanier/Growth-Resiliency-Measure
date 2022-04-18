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
        let year = '';
        let semester = '';
        let batch = '';
        let race = '';
        let eip = '';
        let gender = '';
        let lunchStatus = '';
        let counter = 1;

        let qryArguments = [
            req.query.schoolId
        ]

        // check if the req.query has a filter
        // if so, add WHERE text to the pg query text and add parameters to pool.query
        switch (req.query.year) {
            // NEED TO UPDATE IF THEY CAN SELECT MULTIPLE YEARS
            case 'all':
                break;
            default:
                counter++;
                year = `AND "assessmentBatches"."fiscalYear" = $${counter} `;
                qryArguments.push(req.query.year);
                break;
        }

        switch (req.query.term) {
            // NEED TO UPDATE IF THEY CAN SELECT MULTIPLE SEMESTERS
            case 'all':
                break;
            default:
                counter++;
                semester = `AND "assessmentBatches"."semesterNumber" = $${counter} `;
                qryArguments.push(req.query.term);
                break;
        }

        switch (req.query.batch) {
            case 'all':
                break;
            default:
                counter++;
                batch = `AND "assessmentBatches"."batchNumber" = $${counter} `;
                qryArguments.push(req.query.batch);
                break;
        }

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
                let grade = req.query.grade
                let gradYear = academicYear - grade + 12;

                console.log('grade is', grade)
                console.log('academicYear is', academicYear)
                console.log('gradYear is', gradYear)

                batch = `AND "students"."graduationYear" = $${counter} `;
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
                eip = `AND "students"."eip" $${counter} `;
                qryArguments.push(req.query.eip);
                break;
        }

        switch (req.query.gender) {
            case 'all':
                break;
            default:
                counter++;
                gender = `AND "students"."gender" $${counter} `;
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
        "questions"."measureName"
        FROM "students"
        JOIN "assessmentBatches" ON "assessmentBatches"."schoolId" = "students"."schoolId"
        JOIN "scores" ON "scores"."userId" = "students"."userId"
        JOIN "questions" ON "scores"."questionId" = "questions"."id"
        WHERE "students"."schoolId" = $1`;

        const qryTextTwo = year + semester + batch + race + eip + gender + lunchStatus;

        const qryTextThree = `
        GROUP BY 
        "students"."schoolId",
        "students"."graduationYear", 
        "questions"."measureName"
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
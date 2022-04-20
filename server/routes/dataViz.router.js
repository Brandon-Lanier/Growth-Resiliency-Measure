const express = require('express');
const { object } = require('prop-types');
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

router.get("/", async (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.query);
        let timeFrameSelector = ''
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

        // add columns to query if a time frame of term or batch are chosen
        // otherwise it will just pull a year column
        switch (req.query.timeFrames) {
            case 'term':
                timeFrameSelector = ', "assessmentBatches"."semesterNumber"'
                break;
            case 'batch':
                timeFrameSelector = ', "assessmentBatches"."semesterNumber", "assessmentBatches"."batchNumber"'
            default:
                // default is 'year'
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
        ${timeFrameSelector}
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
        ${timeFrameSelector}
        ORDER BY "assessmentBatches"."fiscalYear"
        ${timeFrameSelector}
        `;


        console.log('qryText', qryTextOne + qryTextTwo + qryTextThree)
        console.log('qryArguments is', qryArguments)

        // get data from database
        const query = await pool.query(qryTextOne + qryTextTwo + qryTextThree, qryArguments);
        const queryObjects = query.rows;

        // organize data into arrays based off time frames
        // first get a list of all academic years in the data
        let years = queryObjects.map(function (object) {
            return object.fiscalYear;
        });
        let uniqueYears = [...new Set(years)];

        // create new arrays of data based on year, term, or batch
        let allYears = [];
        let terms = [1, 2];
        let batches = [1, 2];
        switch (req.query.timeFrames) {
            case 'year':
                // create new arrays of data based on year
                for (let year of uniqueYears) {
                    let array = []
                    for (let object of queryObjects) {
                        if (object.fiscalYear == year) {
                            array.push(object)
                        }
                    }
                    // push new array of data into allYears
                    allYears.push(array)
                }
                break;
            case 'term':
                // create new arrays of data based on year and term
                for (let year of uniqueYears) {
                    for (let term of terms) {
                        let array = []
                        for (let object of queryObjects) {
                            if (object.fiscalYear == year && object.semesterNumber == term) {
                                array.push(object)
                            }
                        }
                        allYears.push(array)
                    }
                    // push new array of data into allYears
                }
                break;
            case 'batch':
                // create new arrays of data based on year, term, and batch
                for (let year of uniqueYears) {
                    for (let term of terms) {
                        for (let batch of batches) {
                            let array = []
                            for (let object of queryObjects) {
                                if (object.fiscalYear == year && object.semesterNumber == term && object.batchNumber == batch) {
                                    array.push(object)
                                }
                            }
                            allYears.push(array)
                        }
                    }
                    // push new array of data into allYears
                }
                break;
        }



        // sends query in correct form
        try {
            res.send(allYears);
        } catch (err) {
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(403);
    }
});


// [
//     {
//         "averageScore": "3.5555555555555556",
//         "measureName": "Balanced",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "3.5555555555555556",
//         "measureName": "Balanced",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "3.0333333333333333",
//         "measureName": "Connection ",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "3.0333333333333333",
//         "measureName": "Connection ",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "3.5833333333333333",
//         "measureName": "Contribution ",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "3.5833333333333333",
//         "measureName": "Contribution ",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "2.3333333333333333",
//         "measureName": "Empathy",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "2.3333333333333333",
//         "measureName": "Empathy",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "3.0000000000000000",
//         "measureName": "Self-Confidence ",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "3.0000000000000000",
//         "measureName": "Self-Confidence ",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "2.7083333333333333",
//         "measureName": "Self-Control",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "2.7083333333333333",
//         "measureName": "Self-Control",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "3.5000000000000000",
//         "measureName": "Self-Expression",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "3.5000000000000000",
//         "measureName": "Self-Expression",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "3.0000000000000000",
//         "measureName": "Understanding adaptability ",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "3.0000000000000000",
//         "measureName": "Understanding adaptability ",
//         "fiscalYear": 2022
//     },
//     {
//         "averageScore": "3.5000000000000000",
//         "measureName": "self-Confidence ",
//         "fiscalYear": 2021
//     },
//     {
//         "averageScore": "3.5000000000000000",
//         "measureName": "self-Confidence ",
//         "fiscalYear": 2022
//     }
// ]

module.exports = router;
// const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// -------------------POST to create new school-----------------------
router.post('/', (req, res) => {
  console.log('req.body is:', req.body.name);
  let queryText = `INSERT INTO "schools" ("name")
  VALUES ($1);`;

  let queryInserts = [req.body.name];

    pool.query(queryText, [queryInserts])
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in schools post', error);
      res.sendStatus(500);
    });
}); // end post route


// This will grab a list of all schools in the DB for front end.
router.get('/', (req,res) => {
  pool.query(`SELECT * FROM "schools"`)
  .then(result => {
    res.send(result.rows)
  }).catch(err => {
    res.sendStatus(500);
  })
})

module.exports = router;
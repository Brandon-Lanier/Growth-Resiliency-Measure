const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET ALL STUDENTS AND INFO
 */
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
  const sqlText = `SELECT * FROM students ORDER BY id ASC`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        });
      }
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;

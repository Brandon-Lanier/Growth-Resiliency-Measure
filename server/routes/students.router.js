const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/', (req, res) => {
   if (req.isAuthenticated()) {
    pool.query(`SELECT * FROM "students"`)
    .then(result => {
        res.send(result.rows);
    }).catch(error => {
        res.sendStatus(500);
    })
   } else {
    res.sendStatus(403);
   }
})

module.exports = router;
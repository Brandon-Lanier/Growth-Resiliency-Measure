const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    const sqlTxt = `SELECT * FROM `
})


module.exports = router;
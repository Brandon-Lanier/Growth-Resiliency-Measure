const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.post('/', (req, res) => {
  let queryText = `INSERT INTO "userId", "firstName", "lastName", "email", 
  "schoolId", "permissionLevel", "admin_pk";`;

  let queryInserts = [
    req.body.userId,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.schoolId,
    req.body.permissionLevel,
    req.body.admin_pk,
  ]

});


module.exports = router;

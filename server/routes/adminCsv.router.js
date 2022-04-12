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
  ];
  if(req.isAuthenticated()) {
    pool.query(queryText, queryInserts)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('error in admin post', error);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});// end post route


module.exports = router;

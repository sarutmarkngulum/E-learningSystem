var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/classes', function (req, res, next) {
    res.render('students/classes');
  });

module.exports = router;

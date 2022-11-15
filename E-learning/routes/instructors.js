var express = require('express');
var router = express.Router();
var Instructor=require('../models/instructors');
var Classes=require('../models/classes');
/* GET home page. */

router.get('/classes', function(req, res, next) {
    Instructor.getInstructorsByUserName(req.user.username,function(err,instructor){
          res.render('instructors/classes',{instructor:instructor});
    });
  });

module.exports = router;

var express = require('express');
var router = express.Router();
var Student=require('../models/students');
var Classes=require('../models/classes');
/* GET home page. */

router.get('/classes', function(req, res, next) {
  Student.getStudentsByUserName(req.user.username,function(err,student){
        res.render('students/classes',{student:student});
  });
});

router.post('/classes/register',function(req,res,next){
  var student_id=req.body.student_id;
  var class_id=req.body.class_id;
  var class_title=req.body.title;

  console.log(student_id)
})

module.exports = router;

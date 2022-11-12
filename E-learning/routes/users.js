var express = require('express');
var router = express.Router();
var User=require('../models/users');
var Student=require('../models/students');
var Instructor=require('../models/instructors');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const {
  check,
  validationResult
} = require('express-validator');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('users/register');
});
router.get('/login', function(req, res, next) {
  res.render('users/login');
});

router.post('/register', [
  check('email', 'กรุณาป้อนอีเมล').isEmail(),
  check('password', 'กรุณาป้อนรหัสผ่าน').not().isEmpty(),
  check('fname', 'กรุณาป้อนชื่อของท่าน').not().isEmpty(),
  check('lname', 'กรุณาป้อนนามสกุลของท่าน').not().isEmpty(),
  check('username', 'กรุณาป้อน Username').not().isEmpty(),
], function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  //Validation Data
  if (!result.isEmpty()) {
    //Return error to views
    res.render('users/register', {
        errors: errors
    })
  }else{
      var username=req.body.username;
      var type=req.body.type;
      var fname=req.body.fname;
      var lname=req.body.lname;
      var email=req.body.email;
      var password=req.body.password;

      var newUser=new User({
          username:username,
          email:email,
          password:password,
          type:type
      });
      if(type=="student"){
          var newStudent=new Student({
                username:username,
                fname:fname,
                lname:lname,
                email:email
          });
          User.saveStudent(newUser,newStudent,function(err,user){
                if(err) throw err
          })
      }else{
        var newInstructor=new Instructor({
              username:username,
              fname:fname,
              lname:lname,
              email:email
        });
        User.saveInstructor(newUser,newInstructor,function(err,user){
              if(err) throw err
        })
      }
      res.redirect('/');
  }
});

module.exports = router;

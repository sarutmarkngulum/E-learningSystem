var express = require('express');
var router = express.Router();
var Instructor=require('../models/instructors');
var Classes=require('../models/classes');
/* GET home page. */

router.post('/register',function(req,res,next){
    var class_id=req.body.class_id;
     var class_name=req.body.class_name;
     var description=req.body.description;
     var instructor=req.body.instructor;

     var newClass=new Classes({
        class_id:class_id,
        title:class_name,
        description:description,
        instructor:instructor,
     })
     info=[];
     info["instructor_user"]=req.user.username
     info["class_id"]=class_id;
     info["class_title"]=class_name;
    
    Classes.saveNewClass(newClass,function(err,student){
        if(err) throw err;
    })
    Instructor.register(info,function(err,result){
        if(err) throw err;
    })
    res.location('/instructors/classes')
    res.redirect('/instructors/classes')
})

module.exports = router;

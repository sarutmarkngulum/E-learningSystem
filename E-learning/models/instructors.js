var mongo = require('mongodb');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/E-learning'

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var instructorSchema = mongoose.Schema({
  username: {
    type: String
  },
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  email: {
    type: String
  },
});

var Instructor = module.exports = mongoose.model('instructors', instructorSchema)

module.exports.getInstructorsByUserName=function(username,callback){
  var query = {
    username:username
  }
  Instructor.findOne(query,callback);
}
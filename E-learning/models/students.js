var mongo = require('mongodb');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/E-learning';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var studentSchema = mongoose.Schema({
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
  classes: [{
    class_id: {
      type: String
    },
    class_title: {
      type: String
    }
  }]
});

var Student = module.exports = mongoose.model('students', studentSchema);

module.exports.getStudentsByUserName = function(username, callback) {
  var query = {
    username: username
  }
  Student.findOne(query, callback);
}
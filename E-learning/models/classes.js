var mongo=require('mongodb');
var mongoose=require('mongoose');

var mongoDB = 'mongodb://127.0.0.1:27017/E-learning';

mongoose.connect(mongoDB, {
  useNewUrlParser: true
})
//Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connect Error'));

var classSchema=mongoose.Schema({
    title:{
      type:String
    },
    description:{
      type:String
    },
    instructor:{
      type:String
    }  
});
var Classes=module.exports=mongoose.model('classes',classSchema)

module.exports.getClasses=function(callback,limit){
      Classes.find(callback).limit(limit)
}
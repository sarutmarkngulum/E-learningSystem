var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');

var mongo=require('mongodb');
var mongoose=require('mongoose');
var db=mongoose.connection;

var session = require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(require('connect-flash')());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('*',function(req,res,next){
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;

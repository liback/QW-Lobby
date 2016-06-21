var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var config          = require('config');
var flash           = require('connect-flash');
var app             = express();
var passport        = require('passport');
var session         = require('express-session');

// Config setup
app.config = config;
require('./config/passport')(passport);

// Socket.io setup
var socket_io = require('socket.io');
var io = socket_io();
app.io = io;

var my_sockets = require('./sockets/base')(io);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
//app.use(passport.session());
app.use(session({ secret: 'plepp', saveUninitialized: true, resave: true }, { cookie: { maxAge: 60000 } }));
app.use(flash());

// Routes
var routes_index     = require('./routes/index');
var routes_users     = require('./routes/users');
var routes_auth      = require('./routes/auth');

app.use('/',        routes_index);
app.use('/users',   routes_users);
app.use('/auth',    routes_auth);

app.use('/scripts', express.static(__dirname + '/node_modules/'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;















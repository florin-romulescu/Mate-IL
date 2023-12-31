var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./routes/database')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { error } = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  var errorMessage = "";
  switch (err.status) {
    case 404:
      errorMessage = "Pagina nu a fost gasita";
      break;
    case 403:
      errorMessage = "Access interzis";
      break;
    default:
      errorMessage = "Eroare la server";
      break;
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    errorCode: err.status || 500,
    errorMessage: errorMessage
  });
});

module.exports = app;

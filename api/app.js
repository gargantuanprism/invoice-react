var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

require('./db')
var m_util = require('./mongoose-util')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.use('/clients', require('./routes/clients'))
app.use('/invoices', require('./routes/invoices'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  var error_messages = []
  if (err.name === 'ValidationError'){
    err.status = 400
    error_messages = m_util.error_messages(err)
  }

  // render the error page
  console.error(err.stack)
  res.status(err.status || 500).json({errors: error_messages}).end()
});

module.exports = app;


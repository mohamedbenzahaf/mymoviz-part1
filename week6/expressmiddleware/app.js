var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const cors = require('cors');
app.use(cors());

// authorization middleware
const apiKeys = ['azerty123', 'supersecretapikey'];
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKeys.includes(apiKey)) {
    return res.status(403).json({
      result: false,
      message: 'Invalid API key'
    });
  }
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;

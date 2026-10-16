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
  const apiKey =
    req.headers['api-key'] ||
    req.headers['x-api-key'] ||
    req.headers['apikey'] ||
    req.headers['authorization'];

  const normalizedKey = apiKey?.startsWith('Bearer ')
    ? apiKey.slice(7)
    : apiKey;

  if (!apiKeys.includes(normalizedKey)) {
    return res.status(403).json({
      result: false,
      error: 'Invalid API key',
    });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
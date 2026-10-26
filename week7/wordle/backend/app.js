require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const gameRouter = require('./routes/game');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connecté !');
  })
  .catch((error) => {
    console.error('Erreur de connexion MongoDB :', error.message);
  });

app.use('/game', gameRouter);

// Ta connexion MongoDB reste ici
module.exports = app;


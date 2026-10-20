
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var app = express();
console.log("✅ APP.JS EST CHARGÉ");

const cors = require('cors');
app.use(cors());

console.log("🔄 Tentative de connexion à MongoDB...");
mongoose
  .connect("mongodb+srv://mohamedbenzahaf01_db_user:Toulouse31@blackboard.egq6twh.mongodb.net/orientexpress")
  .then(() => console.log("✅ MongoDB connecté"))
  .catch((error) => {
    console.error("❌ Erreur MongoDB :", error);
    console.log("📌 Connexion MongoDB lancée");
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;

var express = require('express');
var consign = require("consign");
var expressValidator = require("express-validator");
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(expressValidator());

app.use(bodyParser.json())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000
    }
  }))


consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;
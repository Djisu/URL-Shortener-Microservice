'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var validator = require('validator');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/shorturl/new', (req, res) => {
  //Invalid url
  let validUrl = validator.isURL(req.params.new)
  if (!validUrl){
    res.json({"error":"invalid URL"})
  } else {
    //Generate random number
    let randNum = Math.floor(Math.random() * 10000);
    res.json({"original_url":validUrl,"short_url":randNum})
  }
})

app.listen(port, function () {
  console.log('Node.js listening ...');
});
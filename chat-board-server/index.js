const express = require("express"),
      app = express(),
      cors = require("cors"),
      bodyParser = require("body-parser"),
      errorHandler = require("./handlers/error");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// all routes goes here

// error handling
app.use(function(req, res, next){
  let err = new Error("Not found!");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log("Server is starting on port: ", PORT);
});
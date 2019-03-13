const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');



//App
const app = express();

//Body-parser
app.use(bodyParser.json());

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});







app.use((req, res, next) => {
  const error = new Error('route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 400);
  res.json({
    status: '400',
    error: error.message,
  });
});

module.exports = app;
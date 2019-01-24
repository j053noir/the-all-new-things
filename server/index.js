const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');

const logger = require('./config/logger');
const api = require('./api/v1');

// Init app
const app = express();

// Setup middleware
app.use(requestId);
app.use(logger.requests);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Setup router and routes
app.use('/api', api);
app.use('/api/v1', api);

// No route found handler
app.use((req, res, next) => {
  next({
    message: 'Route not found',
    statusCode: 404,
    type: 'warn',
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message, statusCode = 500, type = 'error' } = err;
  const log = `${logger.header(req)} ${statusCode} ${message}`;

  logger[type](log);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;

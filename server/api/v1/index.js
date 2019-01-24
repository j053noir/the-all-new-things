const router = require('express').Router();

router.route('/').get((req, res, next) => {
  res.json({
    message: 'Welcome to the API',
  });
});

router.route('/tasks').get((req, res, next) => {
  res.json({
    message: 'GET all tasks',
  });
});

module.exports = router;

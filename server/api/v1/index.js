const router = require('express').Router();

const tasks = require('./tasks/routes');
const users = require('./users/routes');

router.route('/').get((req, res, next) => {
  res.json({
    message: 'Welcome to the API V1',
  });
});

router.use('/tasks', tasks);
router.use('/users', users);

module.exports = router;

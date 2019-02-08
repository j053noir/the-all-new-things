const router = require('express').Router();
const controller = require('./controller');
const { auth, owner } = require('./../auth');

router.param('id', controller.id);

router
  .route('/')
  .get(auth, controller.all)
  .post(auth, controller.create);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, owner, controller.update)
  .delete(auth, owner, controller.delete);

module.exports = router;

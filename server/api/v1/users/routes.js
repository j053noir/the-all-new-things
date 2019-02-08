const router = require('express').Router();
const controller = require('./controller');
const { auth, me } = require('./../auth');

router.param('id', controller.id);

router
  .route('/')
  .get(auth, controller.all)
  .post(controller.create);

router.route('/signup').post(controller.create);
router.route('/signin').post(controller.signin);

router
  .route('/:id')
  .get(auth, controller.read)
  .put(auth, me, controller.update)
  .delete(auth, me, controller.delete);

module.exports = router;

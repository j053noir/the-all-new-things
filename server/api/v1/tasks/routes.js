const router = require('express').Router({
  mergeParams: true,
});
const controller = require('./controller');

router.param('id', controller.id);

const { auth, owner } = require('./../auth');

router
  .route('/')
  .get(auth, controller.parentId, controller.all)
  .post(auth, controller.parentId, controller.create);

router
  .route('/:id')
  .get(auth, controller.parentId, controller.read)
  .put(auth, owner, controller.parentId, controller.update)
  .delete(auth, owner, controller.parentId, controller.delete);

module.exports = router;

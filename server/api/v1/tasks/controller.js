const Model = require('./model');

exports.create = (req, res, next) => {
  const { body } = req;
  if (!body.description && !body.author) {
    next({
      message: 'Param "description" is required',
      statusCode: 400,
      type: 'warn',
    });
  } else {
    const document = new Model(body);

    document
      .save()
      .then(doc => {
        res.json(doc);
      })
      .catch(err => {
        next(new Error(err));
      });
  }
};

exports.all = (req, res, next) => {
  Model.find()
    .exec()
    .then(docs => {
      res.json(docs);
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.read = (req, res, next) => {
  const task = tasks.find(t => t.id === +req.params.id);

  if (task) {
    res.json(task);
    return;
  }
  next({
    message: `Task (${req.params.id}) not found`,
    statusCode: 404,
    type: 'warn',
  });
};

exports.update = (req, res, next) => {
  if (req.body.description && req.body.author) {
    const index = tasks.findIndex(t => t.id === +req.params.id);

    if (index >= 0) {
      const task = {
        id: tasks[index].id,
        description: req.body.description,
        author: req.body.author,
        createdAt: tasks[index].createdAt,
        updatedAt: currentDate(),
      };

      tasks.splice(index, 1, task);

      res.json({
        message: `Task (${task.id}) updated`,
      });
      return;
    }
    next({
      message: `Task (${req.params.id}) not found`,
      statusCode: 404,
      type: 'warn',
    });
  }
  next({
    message: 'Params "description" and "author" are required',
    statusCode: 400,
    type: 'warn',
  });
};

exports.delete = (req, res, next) => {
  const index = tasks.findIndex(t => t.id === +req.params.id);
  if (index >= 0) {
    const task = tasks[index];

    tasks.splice(index, 1);

    res.json({
      message: `Task (${task.id}) deleted`,
    });
    return;
  }
  next({
    message: `Task (${req.params.id}) not found`,
    statusCode: 404,
    type: 'warn',
  });
};

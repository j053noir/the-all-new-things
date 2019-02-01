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
  next({
    message: 'Task read has not been implemented yet',
    statusCode: 501,
    type: 'warn',
  });
};

exports.update = (req, res, next) => {
  next({
    message: 'Task read has not been implemented yet',
    statusCode: 501,
    type: 'warn',
  });
};

exports.delete = (req, res, next) => {
  next({
    message: 'Task read has not been implemented yet',
    statusCode: 501,
    type: 'warn',
  });
};

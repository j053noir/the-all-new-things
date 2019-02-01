const Model = require('./model');

exports.id = (req, res, next, id) => {
  Model.findById(id)
    .exec()
    .then(doc => {
      if (!doc) {
        const message = `${Model.modelName} not found`;

        next({
          message,
          statusCode: 404,
          type: 'warn',
        });
      } else {
        req.doc = doc;
        next();
      }
    })
    .catch(err => {
      next(new Error(err));
    });
};

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
  const { doc } = req;
  res.json(doc);
};

exports.update = (req, res, next) => {
  const { doc, body } = req;

  Object.assign(doc, body);

  doc
    .save()
    .then(updated => {
      res.json(updated);
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.delete = (req, res, next) => {
  const { doc } = req;

  doc
    .remove()
    .then(removed => {
      res.json(removed);
    })
    .catch(err => {
      next(new Error(err));
    });
};

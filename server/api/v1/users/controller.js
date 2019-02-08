const { paginationParseParams } = require.main.require('./server/utils/');
const { sortParseParams, sortCompactToStr } = require.main.require(
  './server/utils' // eslint-disable-line comma-dangle
);
const { Model, fields } = require('./model');
const { signToken } = require('./../auth');

exports.id = (req, res, next, id) => {
  Model.findById(id)
    .exec()
    .then(doc => {
      if (!doc) {
        const message = `${Model.modelName} (${id}) not found`;

        res.json({
          success: false,
          message,
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

exports.signin = (req, res, next) => {
  const { body = {} } = req;
  const { email = '', password = '' } = body;

  if (email === '' || password === '') {
    const message = 'Email or password are required';

    next({
      success: false,
      message,
      statusCode: 400,
      type: 'info',
    });
  } else {
    let user = {};
    Model.findOne({ email })
      .exec()
      .then(doc => {
        if (!doc) {
          const message = 'Email or password are not valid';

          next({
            success: false,
            message,
            statusCode: 200,
            type: 'info',
          });
        }
        user = doc;
        return doc.verifyPassword(password);
      })
      .then(verified => {
        if (!verified) {
          const message = 'Email or password are not valid';

          next({
            success: false,
            message,
            statusCode: 200,
            type: 'info',
          });
        } else {
          const { _id } = user;
          const token = signToken({ _id });

          res.json({
            success: true,
            item: user,
            meta: {
              token,
            },
          });
        }
      })
      .catch(err => {
        next(new Error(err));
      });
  }
};

exports.create = (req, res, next) => {
  const { body } = req;
  const doc = new Model(body);

  doc
    .save()
    .then(created => {
      res.status(201);
      res.json({
        success: true,
        item: created,
      });
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.all = (req, res, next) => {
  const { query = {} } = req;
  const { limit, page, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);

  const all = Model.find()
    .sort(sortCompactToStr(sortBy, direction))
    .limit(limit)
    .skip(skip);
  const count = Model.countDocuments();

  Promise.all([all.exec(), count.exec()])
    .then(data => {
      const [docs, total] = data;
      const pages = Math.ceil(total / limit);

      res.json({
        success: true,
        items: docs,
        meta: {
          limit,
          skip,
          total,
          page,
          pages,
          sortBy,
          direction,
        },
      });
    })
    .catch(err => {
      next(new Error(err));
    });
};

exports.read = (req, res, next) => {
  const { doc } = req;
  res.json({
    success: true,
    item: doc,
  });
};

exports.update = (req, res, next) => {
  const { doc, body } = req;

  Object.assign(doc, body);

  doc
    .save()
    .then(updated => {
      res.json({
        success: true,
        item: updated,
      });
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
      res.json({
        success: true,
        item: removed,
      });
    })
    .catch(err => {
      next(new Error(err));
    });
};

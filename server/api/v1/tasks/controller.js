const { paginationParseParams } = require.main.require('./server/utils/');
const { sortParseParams, sortCompactToStr } = require.main.require(
  './server/utils' // eslint-disable-line comma-dangle
);
const { filterByNested } = require.main.require('./server/utils');
const { Model, fields, references } = require('./model');
const { Model: User } = require('./../users/model');

const referencesNames = Object.getOwnPropertyNames(references);

exports.parentId = (req, res, next) => {
  const { params = {} } = req;
  const { id = null } = params;

  if (id) {
    User.findById(id)
      .exec()
      .then(() => {
        next();
      })
      .catch(err => {
        next(new Error(err));
      });
  } else {
    next();
  }
};

exports.id = (req, res, next, id) => {
  const populate = referencesNames.join(' ');
  Model.findById(id)
    .populate(populate)
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

exports.create = (req, res, next) => {
  const { body = {}, params = {} } = req;
  const doc = new Model(body);

  Object.assign(doc, params);

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
  const { query = {}, params = {} } = req;
  const { limit, page, skip } = paginationParseParams(query);
  const { sortBy, direction } = sortParseParams(query, fields);
  const { filters, populate } = filterByNested(params, referencesNames);

  const all = Model.find(filters)
    .sort(sortCompactToStr(sortBy, direction))
    .limit(limit)
    .skip(skip)
    .populate(populate);
  const count = Model.countDocuments(filters);

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
  const { doc = {}, body = {}, params = {} } = req;

  Object.assign(doc, body, params);

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

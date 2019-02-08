const { sign, verify } = require('jsonwebtoken');

const config = require.main.require('./server/config');

const signToken = (payload, expiresIn = '1h') =>
  // eslint-disable-next-line implicit-arrow-linebreak
  sign(payload, config.token.secret, {
    algorithm: 'HS256',
    expiresIn,
  });

const auth = (req, res, next) => {
  const token = req.headers.authorization || req.query.token || req.body.token;
  if (!token) {
    const message = 'Unauthorized';

    next({
      success: false,
      message,
      statusCode: 401,
      type: 'info',
    });
  } else {
    verify(token, config.token.secret, (err, decoded) => {
      if (err) {
        const message = 'Unauthorized';

        next({
          success: false,
          message,
          statusCode: 401,
          type: 'info',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

const me = (req, res, next) => {
  const { decoded = {}, params = {} } = req;
  const { _id = null } = decoded;
  const { id } = params;
  if (_id !== id) {
    const message = 'Forbidden';

    next({
      success: false,
      message,
      statusCode: 403,
      type: 'warn',
    });
  } else {
    next();
  }
};

const owner = (req, res, next) => {
  const { decoded = {}, doc = {} } = req;
  const { _id = null } = decoded;
  const { id } = doc.author;
  if (_id !== id) {
    const message = 'Forbidden';

    next({
      success: false,
      message,
      statusCode: 403,
      type: 'warn',
    });
  } else {
    next();
  }
};

module.exports = {
  signToken,
  auth,
  me,
  owner,
};

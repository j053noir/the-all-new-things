const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');

// Setup logger
const logger = createLogger({
  format: format.simple(),
  transports: [new transports.Console()],
});

morgan.token('id', req => req.id);

const requestFormat = ':remote-addr [:date[iso]] :id ":method :url" :status';
const requests = morgan(requestFormat, {
  stream: {
    write: message => logger.info(message.replace(/(\n\n|\n|\r)/gm, ' ')),
  },
});

// Attach to logger object
logger.requests = requests;

module.exports = logger;

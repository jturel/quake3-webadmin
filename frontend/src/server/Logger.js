const winston = require('winston');
const { WebsocketTransport } = require('./WinstonWebsocketTransport');

const logger = () => {
  let transports = [
    new WebsocketTransport(),
  ];

  if (process.env.NODE_ENV !== 'test') {
    transports.push(new winston.transports.Console());
  }

  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
     // winston.format.colorize({ all: true }),
    ),
    transports: transports,
  });
};

module.exports = logger;

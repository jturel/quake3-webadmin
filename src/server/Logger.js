const winston = require('winston');
const { WebsocketTransport } = require('./WinstonWebsocketTransport');

const logger = () => {
  const transports = [
    new winston.transports.Console(),
    new WebsocketTransport(),
  ];

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

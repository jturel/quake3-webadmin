const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize({ all: true }),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;

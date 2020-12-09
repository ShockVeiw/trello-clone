const winston = require('winston');
const { format } = require('prettier');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss Z' }),
    winston.format.printf(info => {
      if (info.message.body && info.message.body.password) {
        info.message.body = Object.assign({}, info.message.body);
        info.message.body.password = '*****';
      }  
      return JSON.stringify({
        timestamp: info.timestamp,
        level: info.level,
        message: info.message
      })
    })
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/app.log',
      handleExceptions: true,
      handleRejections: true
    })
  ]
});

if (process.env.NODE_ENV === 'development') {
  logger.add(new winston.transports.Console({
    handleExceptions: true,
    handleRejections: true
  }));
}

module.exports = logger;

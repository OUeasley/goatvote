const winston = require('winston');
const { createLogger, format, transports } = require('winston');

//@ts-ignore
const customFormat = format.printf(({ level , message, metadata }) => {
  if (metadata && Object.keys(metadata).length) {
    return `${level}: ${message} ${JSON.stringify(metadata)}`;
  }
  return `${level}: ${message}`;
});
export const logger = winston.createLogger({
  level: 'info', // or any other level
  format: format.combine(
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(), // Using simple format for console readability
    }),
    new winston.transports.Http({

      level: 'info', // Minimum level of logs to send
      host: 'default.main.great-jarzyna-f1rlbvu.cribl-staging.cloud', // The remote server host
      port: 20008, // The port on the remote server
      // You can also specify `ssl` true if you need HTTPS
    }),
  ],
});
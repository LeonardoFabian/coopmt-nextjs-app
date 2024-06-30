// logger.js
// import winston from 'winston';
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`;
});

/*
level : there are different log levels, and we want info and above
format : The format at which our logs will be stored
transports: This is important, we use it to transport our logs to a file.
*/
const logger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "combined.log" }),
    new transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

module.exports = logger;

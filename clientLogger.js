// clientLogger.js

import { createLogger, format, transports } from "winston";
import { Console } from "winston/lib/winston/transports";

const { combine, timestamp, printf, colorize } = format;

const myClientFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    myClientFormat
  ),
  transports: [
    new Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD  HH:mm:ss" }),
        myClientFormat
      ),
    }),
  ],
});

export default logger;

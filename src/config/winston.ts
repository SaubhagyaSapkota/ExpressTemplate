import winston from 'winston';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const path = 'logs';

const logger = winston.createLogger({
    transports: [
        /**
         * Log all logs with level `error` and below to `error.log`
         */
        new winston.transports.File({
            level: 'error',
            filename: `${path}/error.log`,
            format: winston.format.errors({ stack: true, message: true, name: true }),
        }),

        /**
         * Log all logs with level `warn` and below to `warn.log`
         */
        new winston.transports.File({
            level: 'warn',
            filename: `${path}/warn.log`,
            format: winston.format.combine(winston.format.json(), winston.format.prettyPrint()),
        }),

        /**
         * Log all logs with level `info` and below to `info.log`
         */
        new winston.transports.File({
            level: 'info',
            filename: `${path}/info.log`,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json(), winston.format.prettyPrint()),
        }),
    ],
});

/**
 *  For development environment, log to the console with the format:
 */
if (process.env.ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true, colors: { error: 'red', warn: 'yellow', info: 'green' } }),
                winston.format.simple(),
            ),
        }),
    );
}

export default logger;

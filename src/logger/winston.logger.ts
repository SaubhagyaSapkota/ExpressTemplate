import dotenvFlow from 'dotenv-flow';
import winston from 'winston';

dotenvFlow.config();

/**
 * Custom severity levels configuration.
 */
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

/**
 * Assigns colors to each log level for better visualization in console output.
 * These colors will be applied when viewing logs in a terminal that supports ANSI colors.
 */
winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'magenta',
    debug: 'white',
});

/**
 * Custom log formatting configuration for file outputs.
 */
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

/**
 * Configure multiple transport targets for the logger.
 * For files and console.
 */
const transports = [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error', format: fileFormat }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info', format: fileFormat }),
];

const logger = winston.createLogger({
    levels,
    transports,
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
});

// Add console transport with proper formatting for development environment
if (process.env.NODE_ENV === 'development') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.colorize({ all: false, message: true, level: true }),
                winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
            ),
        }),
    );
}

export default logger;

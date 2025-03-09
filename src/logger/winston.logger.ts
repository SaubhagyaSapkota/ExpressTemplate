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
    error: 'red', // Critical issues
    warn: 'yellow', // Potential issues
    info: 'blue', // General information
    http: 'magenta', // HTTP request information
    debug: 'white', // Detailed debugging information
});

/**
 * Custom log formatting configuration.
 */
const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

/**
 * Configure multiple transport targets for the logger.
 * For files and console.
 */
const transports = [
    new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
    new winston.transports.File({ filename: 'logs/http.log', level: 'http' }),
];

const logger = winston.createLogger({
    levels, // Use custom severity levels
    format, // Apply the custom format defined above
    transports, // Use the configured transports
    // Dynamically set minimum log level based on environment
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
});

export default logger;

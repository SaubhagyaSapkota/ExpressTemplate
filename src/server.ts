import app from './app';
import { env } from './config/env';
import logger from './config/winston';

const startServer = () => {
    try {
        /**
         * Hi Folks! 👋
         * You can add more configurations here
         * like connecting to database, firebase, etc
         * and then start the server once everything is ready
         */

        // initialize the server
        const server = app.listen(env.app.PORT, () => {
            logger.info(`Server is running at ${`http://localhost:${env.app.PORT}`} in ${env.app.ENV} mode`);
        });

        // handle server errors
        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.syscall !== 'listen') throw error;
            switch (error.code) {
                case 'EACCES':
                    logger.error(`Port ${env.app.PORT} requires elevated privileges`);
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    logger.error(`Port ${env.app.PORT} is already in use`);
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });

        // handle server shutdown
        const onShutdown = () => {
            server.close(() => {
                logger.info('Server is shut down');
                process.exit(0);
            });
        };

        // handle server termination signals
        process.on('SIGINT', onShutdown);
        process.on('SIGTERM', onShutdown);
    } catch (error) {
        logger.error('Error initializing app:', error);
        process.exit(1);
    }
};

startServer();

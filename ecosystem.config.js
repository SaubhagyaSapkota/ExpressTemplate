/* eslint-disable no-undef */
module.exports = {
    apps: [
        {
            name: 'expressTemplate',
            instances: 'max',
            exec_mode: 'cluster',
            script: './build/src/server.js',
            env: {
                NODE_ENV: 'development',
                PORT: 8080,
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 8080,
            },
        },
    ],
};

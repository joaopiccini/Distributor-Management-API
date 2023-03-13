module.exports = {
    apps: [
        {
            name: 'server',
            script: './index.js',
            env_production: {
                NODE_ENV: 'production',
            },
            env_development: {
                NODE_ENV: 'development',
            },
        },
    ],
};

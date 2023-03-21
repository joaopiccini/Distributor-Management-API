module.exports = {
    apps: [
        {
            name: 'Distributor Server',
            script: './index.js',
            time: true,
            env_production: {
                NODE_ENV: 'production'
            },
            env_development: {
                NODE_ENV: 'development'
            }
        }
    ]
};

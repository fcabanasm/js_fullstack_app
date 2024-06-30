module.exports = {
  apps: [
    {
      name: "server_app",
      script: "./index.js",
      instances: 1,
      autorestart: true,
      watch: true,
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};

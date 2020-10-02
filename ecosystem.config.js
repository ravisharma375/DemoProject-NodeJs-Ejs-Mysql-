module.exports = {
  apps: [
    {
      name: "offer-shoffer-api",
      script: "./src/app.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "750M",
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};

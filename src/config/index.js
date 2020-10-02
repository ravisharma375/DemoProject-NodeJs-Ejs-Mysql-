const Convict = require("convict");
const { string } = require("@hapi/joi");

const config = new Convict({
  HOST: {
    doc: "Host",
    format: String,
    default: "0.0.0.0",
    env: "HOST",
  },
  PORT: {
    doc: "Port",
    format: "port",
    default: 3000,
    env: "PORT",
  },
  DATABASE_NAME: {
    doc: "Database name",
    format: String,
    default: "offer-shoffer-api",
    env: "DATABASE_NAME",
  },
  DATABASE_USERNAME: {
    doc: "Database name",
    format: String,
    default: "offer-shoffer",
    env: "DATABASE_USERNAME",
  },
  DATABASE_PASSWORD: {
    doc: "Database name",
    format: String,
    default: "docker",
    env: "DATABASE_PASSWORD",
  },
  DATABASE_HOST: {
    doc: "Database host",
    format: String,
    default: "0.0.0.0",
    env: "DATABASE_HOST",
  },
  DATABASE_PORT: {
    doc: "Database host",
    format: "port",
    default: 5432,
    env: "DATABASE_PORT",
  },
  DATABASE_DIALECT: {
    doc: "Database type",
    format: String,
    default: "mysql",
    env: "DATABASE_DIALECT",
  },
  DATABASE_POOL_MAX: {
    doc: "Maximum number of connection in pool",
    format: Number,
    default: 5,
    env: "DATABASE_POOL_MAX",
  },
  DATABASE_POOL_MIN: {
    doc: "Minimum number of connection in pool",
    format: Number,
    default: 0,
    env: "DATABASE_POOL_MIN",
  },
  DATABASE_POOL_IDLE: {
    doc: "The maximum time, in milliseconds, that a connection can be idle before being released.",
    format: Number,
    default: 10000,
    env: "DATABASE_POOL_IDLE",
  },
  SMS_API_KEY: {
    doc: "SMS API Key",
    format: String,
    default: "",
    env: "SMS_API_KEY",
  },
  SMS_SENDER: {
    doc: "SMS API Sender",
    format: String,
    default: "EMATRX",
    env: "SMS_SENDER",
  },
  SMS_API_ENDPOINT: {
    doc: "SMS API Endpoint",
    format: String,
    default: "",
    env: "SMS_API_ENDPOINT",
  },
  JWT_SECRET: {
    doc: "JWT Secret",
    format: String,
    default: "",
    env: "JWT_SECRET",
  },
  REFRESH_TOKEN_SECRET: {
    doc: "Refresh Token Secret",
    format: String,
    default: "",
    env: "REFRESH_TOKEN_SECRET",
  },
  JWT_TTL: {
    doc: "JWT TTL",
    format: string,
    default: "",
    env: "JWT_TTL",
  },
  REFRESH_TOKEN_TTL: {
    doc: "Refresh Token TTL",
    format: String,
    default: "",
    env: "REFRESH_TOKEN_TTL",
  },
  SMTP_HOST: {
    doc: "SMTP Host",
    format: String,
    default: "",
    env: "SMTP_HOST",
  },
  SMTP_PORT: {
    doc: "SMTP Port",
    format: String,
    default: "",
    env: "SMTP_PORT",
  },
  SMTP_USERNAME: {
    doc: "SMTP Username",
    format: String,
    default: "",
    env: "SMTP_USERNAME",
  },
  SMTP_PASSWORD: {
    doc: "SMTP Password",
    format: String,
    default: "",
    env: "SMTP_PASSWORD",
  },
  FACEBOOK_APP_ID: {
    doc: "App ID of the app created on facebook.",
    format: String,
    default: "",
    env: "FACEBOOK_APP_ID",
  },
  FACEBOOK_APP_SECRET: {
    doc: "App Secret of the app created on facebook.",
    format: String,
    default: "",
    env: "FACEBOOK_APP_SECRET",
  },
  FACEBOOK_CALLBACK_URL: {
    doc: "App URL where facebook redirect user once succesfully logged in.",
    format: String,
    default: "",
    env: "FACEBOOK_CALLBACK_URL",
  },
  GOOGLE_APP_ID: {
    doc: "App ID of the app created on facebook.",
    format: String,
    default: "",
    env: "GOOGLE_APP_ID",
  },
  GOOGLE_APP_SECRET: {
    doc: "App Secret of the app created on facebook.",
    format: String,
    default: "",
    env: "GOOGLE_APP_SECRET",
  },
  GOOGLE_CALLBACK_URL: {
    doc: "App URL where google redirect user once succesfully logged in.",
    format: String,
    default: "",
    env: "GOOGLE_CALLBACK_URL",
  },
  FCM_PROJECT_NAME: {
    doc: "Project name defined in FCM",
    format: String,
    default: "",
    env: "FCM_PROJECT_NAME",
  },
  FCM_PROJECT_ID: {
    doc: "Project id defined in FCM",
    format: String,
    default: "",
    env: "FCM_PROJECT_ID",
  },
  FCM_LEGACY_KEY: {
    doc: "Project legecy key defined in FCM",
    format: String,
    default: "",
    env: "FCM_LEGACY_KEY",
  },
  FCM_SERVER_KEY: {
    doc: "Project server key  defined in FCM",
    format: String,
    default: "",
    env: "FCM_SERVER_KEY",
  },
  FCM_URL: {
    doc: "FCM url to send notifications",
    format: String,
    default: "",
    env: "FCM_URL",
  },
});

module.exports = { config };
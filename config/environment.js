/*
 * Config environments.
 */
var Config = {};

/*
 * Set current environment.
 */
Config.env = process.env["NODE_ENV"] || "development";

/*
 * Environment: Development.
 */
Config.development = {
  name: "development",
  mongo: "mongodb://127.0.0.1:27017/productfy",
  defaultUrl: "http://localhost",
  serverPort: 3000,
  logNamespace: "development",
  log4js: {
    console: {
      type: "console"
    },
    file: {
      type: "file",
      filename: "development.log",
      maxLogSize: 20480,
      backups: 3,
      pollInterval: 15
    }
  }
};

/*
 * Environment: Production.
 */
Config.production = {
    name: "production",
    mongo: "mongodb://127.0.0.1:27017/productfy",
    defaultUrl: "http://productfy.com.br",
    serverPort: 80,
    logNamespace: "production",
    log4js: {
        console: {
            type: "console"
        },
        file: {
            type: "file",
            filename: "production.log",
            maxLogSize: 20480,
            backups: 6,
            pollInterval: 15
        }
    }
};

config = Config[Config.env];
config.env = Config.env;
exports.config = config;

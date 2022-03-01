if (!process.env.CI) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  [nodeEnv]: {
    username: process.env.MAIN_DB_USER,
    host: process.env.MAIN_DB_HOST,
    database: process.env.MAIN_DB_NAME,
    password: process.env.MAIN_DB_PASSWORD,
    dialect: 'postgres',
  },
};

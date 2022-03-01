const dotenv = require('dotenv');
const yn = require('yn');

dotenv.config();

export const mainDbConfig = {
  host: process.env.MAIN_DB_HOST,
  name: process.env.MAIN_DB_NAME,
  user: process.env.MAIN_DB_USER,
  password: process.env.MAIN_DB_PASSWORD,
};


export const authConfig = {
  audience: process.env.AUTH_AUDIENCE,
  clientId: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  authApiToken: process.env.AUTH_API_TOKEN,
  authApiUrl: process.env.AUTH_API_URL,
};

export const stripeConfig = {
  secretKey: process.env.STRIPE_SECRET_KEY,
};


export const pusherConfig = {
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
};


export const debug = yn(process.env.DEBUG);
export const baseUrl = process.env.BASE_URL;
export const port = process.env.PORT || 9090;
export const { PASSWORD_SALT, TOKEN_SALT } = process.env;

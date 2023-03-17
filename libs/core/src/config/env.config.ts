import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '../../../../.env').replace('/dist', ''),
});

const appConfig = {
  env: process.env.ENV || 'development',
  server: {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
  },
  database: {
    DB_TYPE: process.env.DB_TYPE || 'postgres',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_DATABASE_NAME: process.env.DB_DATABASE_NAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || '123456',
  },
  jwt: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'abcxyz',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '30d',
  },
  payment: {
    stripe: {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || '',
    },
  },
};

export { appConfig };

import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { appConfig } from './env.config';

const typeOrmOption = (): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: appConfig.database.DB_HOST,
    port: +appConfig.database.DB_PORT,
    username: appConfig.database.DB_USERNAME,
    database: appConfig.database.DB_DATABASE_NAME,
    password: appConfig.database.DB_PASSWORD,
    extra: { charset: 'utf8mb4_unicode_ci' },
    synchronize: false,
    logging: appConfig.env === 'development' ? true : false,
  };
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    // console.log(typeOrmOption(configService));
    return typeOrmOption();
  },
};

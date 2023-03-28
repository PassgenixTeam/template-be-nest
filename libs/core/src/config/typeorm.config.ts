import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { appConfig } from './env.config';
import { SnakeNamingStrategy } from '../strategies/snake-naming.strategy';
import { join } from 'path';

const typeOrmOption = (): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: appConfig.database.MY_SQL.DB_HOST,
    port: +appConfig.database.MY_SQL.DB_PORT,
    username: appConfig.database.MY_SQL.DB_USERNAME,
    database: appConfig.database.MY_SQL.DB_DATABASE_NAME,
    password: appConfig.database.MY_SQL.DB_PASSWORD,
    namingStrategy: new SnakeNamingStrategy(),
    extra: { charset: 'utf8mb4_unicode_ci' },
    synchronize: false,
    entities: [
      join(__dirname + '../../../../../src/modules/**/*.entity{.ts,.js}'),
    ],
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

import { DataSource } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from '@app/core';

dotenv.config({
  path: join(__dirname, '../../.env'),
});

const dataSources: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: true,
  entities: [join(__dirname + '../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../../database/migrations/*{.ts,.js}')],
  synchronize: false,
  logging: true,
});

export default dataSources;

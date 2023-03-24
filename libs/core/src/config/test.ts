import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from '../strategies/snake-naming.strategy';

const dataSource: DataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  database: 'g2k',
  password: '123456',
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [
    '/Users/nmthangdn2000/Documents/words/company/new-g2k/dist/apps/user/../../../**/*.entity.{js,ts}',
  ],
  migrations: [
    '/Users/nmthangdn2000/Documents/words/company/new-g2k/dist/apps/user/../../../apps/user/src/database/migrations/*{.ts,.js}',
  ],
  extra: { charset: 'utf8mb4_unicode_ci' },
  synchronize: false,
  logging: true,
});

export default dataSource;

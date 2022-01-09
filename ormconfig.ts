import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'ssanta',
  entities: ['dist/src/**/*.entity.js'],
  // entities: ['dist/**/**.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
export default config;

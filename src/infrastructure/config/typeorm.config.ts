import { DataSource, DataSourceOptions } from 'typeorm';

export const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'vending_machine',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrationsRun: true,
  logging: true,
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  synchronize: false,
};

const dataSource = new DataSource(options);

export default dataSource;

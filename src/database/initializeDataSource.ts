import { DataSource } from 'typeorm';

export function initializeDataSource(connectionName: string) {
  const dataSource = new DataSource({
    host: process.env.POSTGRES_HOST,
    type: 'postgres',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
    name: connectionName,
  });

  return dataSource;
}

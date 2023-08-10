import 'dotenv/config';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  host: process.env.DB_HOST,
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  name: 'migrate',
});

export { dataSource };

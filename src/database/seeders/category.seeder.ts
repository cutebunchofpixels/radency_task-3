import { DataSource } from 'typeorm';
import { Category } from '../../categories/entites/categoty.entity';
import 'dotenv/config';

const TABLE_NAME = 'category';

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
  name: 'seed',
});

async function seed(dataSource: DataSource): Promise<void> {
  await dataSource.initialize();

  const categories: Category[] = [];
  const repo = dataSource.getRepository(Category);

  categories.push(repo.create({ value: 'Idea' }));
  categories.push(repo.create({ value: 'Task' }));
  categories.push(repo.create({ value: 'Random thought' }));

  await dataSource.manager.query(
    `ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1`,
  );
  await repo.save<Category>(categories);
}

seed(dataSource);

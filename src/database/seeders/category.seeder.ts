import 'dotenv/config';
import Category from '../../categories/entites/categoty.entity';
import { initializeDataSource } from '../initializeDataSource';
const TABLE_NAME = 'category';

async function seed(): Promise<void> {
  const dataSource = initializeDataSource('seed-category');
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

seed();

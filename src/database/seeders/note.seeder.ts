import { DataSource } from 'typeorm';
import { Note } from '../../notes/entities/note.entity';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

const TABLE_NAME = 'note';

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

  const notes: Note[] = [];
  const repo = dataSource.getRepository(Note);

  for (let i = 0; i < 7; i++) {
    const dto: CreateNoteDto = {
      name: faker.word.words({ count: { min: 3, max: 7 } }),
      content: faker.word.words({ count: { min: 5, max: 15 } }),
      categoryId: faker.number.int({ min: 1, max: 3 }),
    };

    const note = repo.create(dto);
    notes.push(note);
  }

  await dataSource.manager.query(
    `ALTER SEQUENCE ${TABLE_NAME}_id_seq RESTART WITH 1`,
  );
  await repo.save<Note>(notes);
}

seed(dataSource);

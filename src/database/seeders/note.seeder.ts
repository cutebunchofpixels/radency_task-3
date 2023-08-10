import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { CreateNoteDto } from '../../notes/dto/create-note.dto';
import { Note } from '../../notes/entities/note.entity';
import { initializeDataSource } from '../initializeDataSource';

const TABLE_NAME = 'note';

async function seed(): Promise<void> {
  const dataSource = initializeDataSource('seed-note');
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

seed();

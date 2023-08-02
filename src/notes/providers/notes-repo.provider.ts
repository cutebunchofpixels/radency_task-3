import { DATA_SOURCE_INJECTION_TOKEN } from 'src/database/database.provider';
import { DataSource } from 'typeorm';
import { Note } from '../entities/note.entity';
import { NOTES_REPO_INJECTION_TOKEN } from '../constants';

export const notesRepoProvider = {
  provide: NOTES_REPO_INJECTION_TOKEN,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Note),
  inject: [DATA_SOURCE_INJECTION_TOKEN],
};

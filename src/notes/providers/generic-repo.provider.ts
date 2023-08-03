import { Provider } from '@nestjs/common';
import { DATA_SOURCE_INJECTION_TOKEN } from 'src/database/database.provider';
import { DataSource } from 'typeorm';
import { GENERIC_REPO_INJECTION_TOKEN } from '../constants';
import { Note } from '../entities/note.entity';

export const genericRepoProvider: Provider = {
  provide: GENERIC_REPO_INJECTION_TOKEN,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Note),
  inject: [DATA_SOURCE_INJECTION_TOKEN],
};

import { DeepPartial } from 'typeorm';
import { Note } from '../entities/note.entity';
import { IBaseRepository } from '../../common/base-repository.interface';
import { NotesStatsDto } from '../dto/notes-stats.dto';

export interface INotesRepository extends IBaseRepository<Note> {
  instantiateEntity(partial: DeepPartial<Note>): Note;

  getStats(): Promise<NotesStatsDto[]>;
}

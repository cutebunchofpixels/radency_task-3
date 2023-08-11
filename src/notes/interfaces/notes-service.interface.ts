import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesStatsDto } from '../dto/notes-stats.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import Note from '../entities/note.entity';

export interface INotesService {
  create(createNoteDto: CreateNoteDto): Promise<Note>;

  getAll(): Promise<Note[]>;

  getById(id: number): Promise<Note>;

  update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note>;

  remove(id: number): Promise<Note>;

  getStats(): Promise<NotesStatsDto[]>;
}

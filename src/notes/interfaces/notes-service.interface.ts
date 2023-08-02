import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { Note } from '../entities/note.entity';

export interface INotesService {
  create(createNoteDto: CreateNoteDto): Promise<Note>;

  findAll(): Promise<Note[]>;

  findOne(id: number): Promise<Note>;

  update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note>;

  remove(id: number): Promise<Note>;
}

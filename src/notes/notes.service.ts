import { Inject, Injectable } from '@nestjs/common';
import { NOTES_REPO_INJECTION_TOKEN } from './constants';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { INotesService } from './interfaces/notes-service.interface';
import { INotesRepository } from './interfaces/notes-repository.interface';
import { NotesStatsDto } from './dto/notes-stats.dto';

@Injectable()
export class NotesService implements INotesService {
  constructor(
    @Inject(NOTES_REPO_INJECTION_TOKEN)
    private readonly notesRepo: INotesRepository,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = this.notesRepo.instantiateEntity({
      categoryId: createNoteDto.categoryId,
      name: createNoteDto.name,
      content: createNoteDto.content,
    });

    const saved = await this.notesRepo.create(newNote);
    saved.parseDates();

    return saved;
  }

  async getAll(): Promise<Note[]> {
    return await this.notesRepo.getAll();
  }

  async getById(id: number): Promise<Note> {
    return await this.notesRepo.getById(id);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.getById(id);
    Object.assign(note, updateNoteDto);

    const saved = await this.notesRepo.update(note);
    saved.parseDates();

    return saved;
  }

  async remove(id: number): Promise<Note> {
    const note = await this.getById(id);

    return this.notesRepo.remove(note);
  }

  async getStats(): Promise<NotesStatsDto[]> {
    return await this.notesRepo.getStats();
  }
}

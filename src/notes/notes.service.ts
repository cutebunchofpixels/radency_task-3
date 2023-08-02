import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { NOTES_REPO_INJECTION_TOKEN } from './constants';
import { INotesService } from './interfaces/notes-service.interface';

@Injectable()
export class NotesService implements INotesService {
  constructor(
    @Inject(NOTES_REPO_INJECTION_TOKEN)
    private readonly notesRepo: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const newNote = this.notesRepo.create({
      categoryId: createNoteDto.categoryId,
      name: createNoteDto.name,
      content: createNoteDto.content,
    });

    return await this.notesRepo.save(newNote);
  }

  async findAll() {
    return await this.notesRepo.find();
  }

  async findOne(id: number): Promise<Note> {
    return await this.notesRepo.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);

    return await this.notesRepo.save({ ...note, ...updateNoteDto });
  }

  async remove(id: number) {
    const note = await this.findOne(id);

    return this.notesRepo.remove(note);
  }
}

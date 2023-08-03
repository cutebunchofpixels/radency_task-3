import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NOTES_SERVICE_INJECTION_TOKEN } from './constants';
import { INotesService } from './interfaces/notes-service.interface';
import { Note } from './entities/note.entity';
import { NotesStatsDto } from './dto/notes-stats.dto';

@Controller('notes')
export class NotesController {
  constructor(
    @Inject(NOTES_SERVICE_INJECTION_TOKEN)
    private readonly notesService: INotesService,
  ) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return await this.notesService.create(createNoteDto);
  }

  @Get()
  async getAll(): Promise<Note[]> {
    return await this.notesService.getAll();
  }

  @Get('/stats')
  async getStats(): Promise<NotesStatsDto[]> {
    return await this.notesService.getStats();
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return await this.notesService.getById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Note> {
    return await this.notesService.remove(id);
  }
}

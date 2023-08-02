import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NOTES_SERVICE_INJECTION_TOKEN } from './constants';
import { INotesService } from './interfaces/notes-service.interface';

@Controller('notes')
export class NotesController {
  constructor(
    @Inject(NOTES_SERVICE_INJECTION_TOKEN)
    private readonly notesService: INotesService,
  ) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notesService.remove(id);
  }
}

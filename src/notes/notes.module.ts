import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { notesServiceProvider } from './providers/notes-service.provider';
import { notesRepoProvider } from './providers/notes-repo.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [notesRepoProvider, notesServiceProvider],
})
export class NotesModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { NotesController } from './notes.controller';
import { notesServiceProvider } from './providers/notes-service.provider';
import { genericRepoProvider } from './providers/generic-repo.provider';
import { notesRepoProvider } from './providers/notes-repo.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [NotesController],
  providers: [notesRepoProvider, notesServiceProvider, genericRepoProvider],
})
export class NotesModule {}

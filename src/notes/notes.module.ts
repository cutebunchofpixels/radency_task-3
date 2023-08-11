import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { notesServiceProvider } from './providers/notes-service.provider';
import { notesRepoProvider } from './providers/notes-repo.provider';
import Note from './entities/note.entity';
import { SequelizeModule } from '@nestjs/sequelize/dist';

@Module({
  imports: [SequelizeModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [notesRepoProvider, notesServiceProvider],
})
export class NotesModule {}

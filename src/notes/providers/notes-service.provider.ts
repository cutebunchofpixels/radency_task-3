import { Provider } from '@nestjs/common';
import { NotesService } from '../notes.service';
import { NOTES_SERVICE_INJECTION_TOKEN } from '../constants';

export const notesServiceProvider: Provider = {
  provide: NOTES_SERVICE_INJECTION_TOKEN,
  useClass: NotesService,
};

import { NOTES_REPO_INJECTION_TOKEN } from '../constants';
import { NotesRepositry } from '../notes.repository';

export const notesRepoProvider = {
  provide: NOTES_REPO_INJECTION_TOKEN,
  useClass: NotesRepositry,
};

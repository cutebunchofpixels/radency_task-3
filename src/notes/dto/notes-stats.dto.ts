import Category from 'src/categories/entites/categoty.entity';

export class NotesStatsDto {
  category: Omit<Category, 'notes'>;
  amountArchived: number;
  amountActive: number;
}

export interface RawStatsQueryResult {
  note_category_id: number;
  category_value: string;
  amount_active: number;
  amount_archived: number;
}

import { Category } from 'src/categories/entites/categoty.entity';

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

export function mapFromRawQueryResult(item: RawStatsQueryResult) {
  const mapped: NotesStatsDto = {
    category: {
      id: item['note_category_id'],
      value: item['category_value'],
    },
    amountActive: item['amount_active'],
    amountArchived: item['amount_archived'],
  };

  return mapped;
}

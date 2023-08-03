import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import {
  NotesStatsDto,
  RawStatsQueryResult,
  mapFromRawQueryResult,
} from './dto/notes-stats.dto';
import { Note } from './entities/note.entity';
import { INotesRepository } from './interfaces/notes-repository.interface';

@Injectable()
export class NotesRepositry implements INotesRepository {
  constructor(
    @InjectRepository(Note)
    private readonly genericRepository: Repository<Note>,
  ) {}

  instantiateEntity(partial: DeepPartial<Note>): Note {
    return this.genericRepository.create(partial);
  }

  async getById(id: number): Promise<Note> {
    return await this.genericRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  async getAll(): Promise<Note[]> {
    return await this.genericRepository.find({
      relations: ['category'],
    });
  }
  async create(entity: Note): Promise<Note> {
    return await this.genericRepository.save(entity);
  }

  async update(entity: Note): Promise<Note> {
    return await this.genericRepository.save(entity);
  }

  async remove(entity: Note): Promise<Note> {
    return await this.genericRepository.remove(entity);
  }

  async getStats(): Promise<NotesStatsDto[]> {
    const queryBuilder = this.genericRepository.createQueryBuilder('note');

    const categoryIdAlias: keyof RawStatsQueryResult = 'note_category_id';
    const categoryValueAlias: keyof RawStatsQueryResult = 'category_value';
    const amountActiveAlias: keyof RawStatsQueryResult = 'amount_active';
    const amountArchived: keyof RawStatsQueryResult = 'amount_archived';

    const rawQueryResult: RawStatsQueryResult[] = await queryBuilder
      .select('note.categoryId', categoryIdAlias)
      .addSelect('category.value', categoryValueAlias)
      .addSelect(
        'COUNT(CASE WHEN "isArchived" IS TRUE THEN 1 END)',
        amountArchived,
      )
      .addSelect(
        'COUNT(CASE WHEN "isArchived" IS FALSE THEN 1 END)',
        amountActiveAlias,
      )
      .leftJoin('category', 'category', 'note.categoryId = category.id')
      .groupBy('note.categoryId')
      .addGroupBy('category.value')
      .getRawMany();

    const stats: NotesStatsDto[] = [];

    for (const item of rawQueryResult) {
      const statsRecord = mapFromRawQueryResult(item);

      stats.push(statsRecord);
    }

    return stats;
  }
}

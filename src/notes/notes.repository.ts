import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import Category from 'src/categories/entites/categoty.entity';
import { NotesStatsDto } from './dto/notes-stats.dto';
import Note from './entities/note.entity';
import { INotesRepository } from './interfaces/notes-repository.interface';

@Injectable()
export class NotesRepositry implements INotesRepository {
  constructor(
    @InjectModel(Note)
    private readonly noteModel: typeof Note,
  ) {}

  instantiateEntity(partial: Partial<Note>): Note {
    return this.noteModel.build(partial);
  }

  async getById(id: number): Promise<Note> {
    return await this.noteModel.findOne({
      where: {
        id,
      },
      include: Category,
      rejectOnEmpty: true,
    });
  }

  async getAll(): Promise<Note[]> {
    return await this.noteModel.findAll({ include: Category });
  }
  async create(entity: Note): Promise<Note> {
    const created = await entity.save();

    //also include category
    const createdWithRelations = await this.getById(created.id);

    return createdWithRelations;
  }

  async update(entity: Note): Promise<Note> {
    return await entity.save();
  }

  async remove(entity: Note): Promise<Note> {
    await entity.destroy({});
    return entity;
  }

  async getStats(): Promise<NotesStatsDto[]> {
    const stats = (await this.noteModel.findAll({
      attributes: [
        [
          Sequelize.literal('COUNT(CASE WHEN "isArchived" IS TRUE THEN 1 END)'),
          'amountArchived',
        ],
        [
          Sequelize.literal(
            'COUNT(CASE WHEN "isArchived" IS FALSE THEN 1 END)',
          ),
          'amountActive',
        ],
      ],
      include: [{ model: Category, attributes: ['id', 'value'], right: true }],
      group: ['category.id', 'category.value'],
      raw: false,
    })) as unknown as NotesStatsDto[];

    return stats;
  }
}

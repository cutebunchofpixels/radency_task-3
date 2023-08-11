import { AllowNull, Column, HasMany, Model, Table } from 'sequelize-typescript';
import Note from '../../notes/entities/note.entity';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'category', timestamps: false })
export default class Category extends Model {
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  value: string;

  @HasMany(() => Note)
  notes: Note[];
}

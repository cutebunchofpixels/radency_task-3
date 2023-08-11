import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Category from '../../categories/entites/categoty.entity';
import { DataTypes } from 'sequelize';

@Table({ tableName: 'note', updatedAt: false, deletedAt: false })
export default class Note extends Model {
  @AllowNull(false)
  @Column(DataTypes.TEXT)
  name: string;

  @AllowNull(false)
  @CreatedAt
  @Column
  creationDate: Date;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  content: string;

  @Default(false)
  @AllowNull(false)
  @Column
  isArchived: boolean;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @Column(DataTypes.VIRTUAL)
  get dates(): string[] {
    const dateRegex =
      /(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})/g;
    const dates = this.content.match(dateRegex) || [];

    return dates;
  }
}

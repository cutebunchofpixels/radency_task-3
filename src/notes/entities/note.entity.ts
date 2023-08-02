import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/base-entity.entity';
import { Category } from '../../categories/entites/categoty.entity';

@Entity()
export class Note extends BaseEntity {
  @Column()
  name: string;

  @CreateDateColumn()
  creationDate: Date;

  @Column()
  content: string;

  @Column()
  isArchived: boolean;

  @ManyToOne(() => Category, (category) => category.notes)
  category: Category;

  dates: string[];

  @AfterLoad()
  parseDates() {
    const dateRegex =
      /(0?[1-9]|[1-2][0-9]|3[0-1])\/(0?[1-9]|1[0-2])\/([0-9]{4})/g;
    const dates = this.content.match(dateRegex) || [];

    this.dates = dates;
  }
}

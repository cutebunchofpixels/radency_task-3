import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base-entity.entity';
import { Note } from '../../notes/entities/note.entity';

@Entity()
export class Category extends BaseEntity {
  @Column()
  value: string;

  @OneToMany(() => Note, (note) => note.category)
  notes: Note[];
}

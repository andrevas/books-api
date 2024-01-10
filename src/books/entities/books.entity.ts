import { BookRating } from 'src/books/entities/ratings.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column()
  genre: string;

  @Column('decimal', {
    default: 0,
  })
  averageRating: number;

  @OneToMany(() => BookRating, (bookRating) => bookRating.book)
  ratings: BookRating[];
}

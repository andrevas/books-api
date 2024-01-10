import { Book } from 'src/books/entities/books.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rate: number;

  @ManyToOne(() => Book, (book) => book.ratings)
  book: Book;
}

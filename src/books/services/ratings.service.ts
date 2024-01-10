import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { calculateAverage } from 'src/utils/calculate-avg.util';
import { Repository } from 'typeorm';
import { Book } from '../entities/books.entity';
import { BookRating } from '../entities/ratings.entity';

@Injectable()
export class BookRatingsService {
  constructor(
    @InjectRepository(BookRating)
    private readonly bookRatingRepository: Repository<BookRating>,
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async addRating(bookId: number, rate: number): Promise<BookRating> {
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
      relations: ['ratings'],
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const newRating = this.bookRatingRepository.create({ rate, book });

    book.averageRating = calculateAverage(
      [...book.ratings, newRating].map((rating) => Number(rating.rate)),
    );

    const [_, addedRating] = await Promise.all([
      this.booksRepository.save(book),
      this.bookRatingRepository.save(newRating),
    ]);
    return addedRating;
  }
}

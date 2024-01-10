import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { Book } from './entities/books.entity';
import { BooksService } from './services/books.service';
import { BookRating } from './entities/ratings.entity';
import { BookRatingsService } from './services/ratings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRating])],
  controllers: [BooksController],
  providers: [BooksService, BookRatingsService],
})
export class BooksModule {}

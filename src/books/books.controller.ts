import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateBookDto, FindBookDto } from './dto/books.dto';
import { Book } from './entities/books.entity';
import { BooksService } from './services/books.service';
import { CreateRatingDto, CreateRatingResponseDto } from './dto/ratings.dto';
import { BookRatingsService } from './services/ratings.service';
import { SortQueryDto } from './dto/sort.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly bookRatingService: BookRatingsService,
  ) {}

  @Get()
  async findAll(@Query() query: SortQueryDto): Promise<FindBookDto[]> {
    const hasSortQuery = query && query.sort;
    const [sortField, sortOrder] = hasSortQuery ? query.sort.split(':') : [];
    const res = hasSortQuery
      ? await this.booksService.findAndSort(sortField, sortOrder)
      : await this.booksService.findAll();

    return res.map((book) => ({
      ...book,
      ratings: book.ratings.map((rating) => Number(rating.rate)),
    }));
  }

  @Post()
  createOne(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Post('/:bookId/:rate')
  async addRating(
    @Param() params: CreateRatingDto,
  ): Promise<CreateRatingResponseDto> {
    const { bookId, rate } = params;
    const res = await this.bookRatingService.addRating(bookId, rate);
    return {
      id: res.id,
      rate: res.rate,
    };
  }
}

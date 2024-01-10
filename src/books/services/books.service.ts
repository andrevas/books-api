import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../dto/books.dto';
import { Book } from '../entities/books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto): Promise<Book> {
    return this.booksRepository.save(createBookDto);
  }

  findAndSort(sortField, sortOrder): Promise<Book[]> {
    return this.booksRepository.find({
      order: {
        [sortField]: sortOrder === 'desc' ? 'DESC' : 'ASC',
      },
      relations: {
        ratings: true,
      },
    });
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: {
        ratings: true,
      },
    });
  }
}

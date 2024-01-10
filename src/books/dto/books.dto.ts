import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsString()
  genre: string;
}

export class FindBookDto {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  averageRating: number;
  ratings: number[];
}

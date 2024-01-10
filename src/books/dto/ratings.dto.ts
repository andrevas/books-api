import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumberString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  bookId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  rate: number;
}

export class CreateRatingResponseDto {
  id: number;
  rate: number;
}

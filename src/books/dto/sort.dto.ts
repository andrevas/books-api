import { IsOptional, Matches } from 'class-validator';

export class SortQueryDto {
  @IsOptional()
  @Matches(/(id|title|author|year|genre|averageRating):(asc|desc)$/, {
    message:
      'query should be sort=id|title|author|year|genre|averageRating:asc|desc',
  })
  sort?: string;
}

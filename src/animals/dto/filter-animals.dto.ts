import { IsEnum, IsOptional, Min, MinLength } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusAnimal } from '../models/animal.status.model';
import { Type } from 'class-transformer';
import { IsPeruvianDocument } from 'src/common/validators/is-document.validator';

export class FilterAnimalsDto extends PaginationDto {
  @IsEnum(StatusAnimal)
  @IsOptional()
  status?: StatusAnimal;

  @MinLength(3)
  @IsOptional()
  nickname?: string;

  @Type(() => Number)
  @Min(1)
  @IsOptional()
  animalId?: number;
}

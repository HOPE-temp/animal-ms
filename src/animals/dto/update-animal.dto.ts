import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateAnimalDto } from './create-animal.dto';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusAnimal } from '../models/animal.status.model';

export class UpdateAnimalDto extends PartialType(
  OmitType(CreateAnimalDto, ['type', 'status']),
) {}
export class UpdateStatusAnimalDto {
  @IsEnum(StatusAnimal)
  @IsNotEmpty()
  @ApiProperty({ description: 'Status relation with adoptions' })
  readonly status: StatusAnimal;
}

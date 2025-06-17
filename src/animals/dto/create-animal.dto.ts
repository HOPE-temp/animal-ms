import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxDate,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import {
  SexAnimal,
  SizeAnimal,
  StatusAnimal,
  TypeAnimal,
} from '../models/animal.status.model';

export class CreateAnimalDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ description: 'Nickname in HOPE' })
  readonly nickname: string;

  @IsEnum(TypeAnimal, { message: 'type must be either dog or cat' })
  @IsNotEmpty()
  @ApiProperty({ description: 'Type animal dog or cat' })
  readonly type: TypeAnimal;

  @IsString()
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  @ApiProperty({ description: 'Breed of animal' })
  readonly breed: string;

  @IsEnum(SizeAnimal)
  @IsNotEmpty()
  @ApiProperty({
    description: "Size's animal name small, medium, large, giant",
  })
  readonly size: SizeAnimal;

  @IsEnum(SexAnimal)
  @IsNotEmpty()
  @ApiProperty({ description: 'Sex of animal' })
  readonly sex: SexAnimal;

  @IsIn([StatusAnimal.IN_ADOPTION, StatusAnimal.IN_OBSERVATION])
  @IsNotEmpty()
  @ApiProperty({ description: 'Status relation with adoption' })
  readonly status: StatusAnimal;

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  @ApiProperty({ description: 'Probably birthdate of animal' })
  readonly birthdate: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(450)
  @MinLength(6)
  @ApiProperty({ description: 'History relation od rescute of animal' })
  readonly descriptionHistory: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ description: 'Animal is sterilized' })
  readonly isSterilized: boolean;
}

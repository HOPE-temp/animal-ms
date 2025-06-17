import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Animal } from '../entities/animal.entity';
import { CreateAnimalDto } from '../dto/create-animal.dto';
import {
  UpdateAnimalDto,
  UpdateStatusAnimalDto,
} from '../dto/update-animal.dto';
import { validateStatusFlow } from 'src/common/utils/statusFlow.util';
import { animalStatusFlow } from '../flows/animalStatus.flow';
import { FilterAnimalsDto } from '../dto/filter-animals.dto';
import { StatusAnimal } from '../models/animal.status.model';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private animalRepo: Repository<Animal>,
  ) {}

  create(createAnimalDto: CreateAnimalDto) {
    const newAnimal = this.animalRepo.create(createAnimalDto);
    return this.animalRepo.save(newAnimal);
  }

  findAll(params?: FilterAnimalsDto) {
    const options: FindManyOptions<Animal> = {
      take: 10,
      skip: 0,
    };

    if (params) {
      const { limit, offset } = params;
      options.take = limit || 10;
      options.skip = offset || 0;
    }

    return this.animalRepo.find(options);
  }

  async findOne(id: number) {
    const animal = await this.animalRepo.findOne({
      where: { id },
      relations: ['animalImages'],
    });
    if (!animal) {
      throw new NotFoundException(`Animal #${id} not found`);
    }
    return animal;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const animal = await this.findOne(id);
    this.animalRepo.merge(animal, updateAnimalDto);

    return this.animalRepo.save(animal);
  }


  async updateStatus(id: number, updateStatusAnimalDto: UpdateStatusAnimalDto) {
    const animal = await this.findOne(id);

    this.updateStatusVerified(animal, updateStatusAnimalDto.status);

    this.animalRepo.merge(animal, updateStatusAnimalDto);

    return this.animalRepo.save(animal);
  }

  updateStatusVerified(animal: Animal, status: StatusAnimal) {
    if (!validateStatusFlow(animal.status, status, animalStatusFlow)) {
      throw new ConflictException(
        `new status is not validate: ${animal.status} -> ${status}`,
      );
    }

    this.animalRepo.merge(animal, { status });
    return animal;
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.animalRepo.softDelete({ id });
  }
}

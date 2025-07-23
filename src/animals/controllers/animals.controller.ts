import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CreateAnimalDto } from '../dto/create-animal.dto';
import {
  UpdateAnimalDto,
  UpdateStatusAnimalDto,
  UpdateStatusSterilizationDto,
} from '../dto/update-animal.dto';
import { FilterAnimalsDto } from '../dto/filter-animals.dto';

import { AnimalsService } from '../services/animals.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleUser } from 'src/auth/models/roles.model';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Post()
  @ApiOperation({ summary: 'Register an animal' })
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get a list of animals' })
  findAll(@Query() params: FilterAnimalsDto) {
    return this.animalsService.findAll(params);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get an animal by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.findOne(id);
  }

  @Get(':id/availability')
  consultaDisponibilidadAnimal(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.availabilityAnimal(id);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Put(':id')
  @ApiOperation({ summary: 'Update animal information' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update status animal' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusAnimalDto: UpdateStatusAnimalDto,
  ) {
    return this.animalsService.updateStatus(id, updateStatusAnimalDto);
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Put(':id/update_esterilization')
  @ApiOperation({ summary: 'Update status animal' })
  updateStatusSterilization(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusAnimalDto: UpdateStatusSterilizationDto,
  ) {
    return this.animalsService.updateStatusSterilization(
      id,
      updateStatusAnimalDto,
    );
  }

  @Roles(RoleUser.ADMIN, RoleUser.VOLUNTEER)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete animal by id' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.remove(id);
  }
}

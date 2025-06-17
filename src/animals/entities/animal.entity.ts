import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  SexAnimal,
  SizeAnimal,
  StatusAnimal,
  TypeAnimal,
} from '../models/animal.status.model';
import { IsOptional } from 'class-validator';

@Entity('animals')
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'enum',
    enum: TypeAnimal,
    default: TypeAnimal.DOG,
    nullable: false,
  })
  type: TypeAnimal;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  breed: string;

  @Column({
    type: 'enum',
    enum: SizeAnimal,
    default: SizeAnimal.MEDIUM,
  })
  size: SizeAnimal;

  @Column({
    type: 'enum',
    enum: SexAnimal,
    default: SexAnimal.FEMALE,
  })
  sex: SexAnimal;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthdate: Date;

  @Column({
    name: 'description_history',
    type: 'text',
    nullable: true,
  })
  descriptionHistory: string;

  @Column({
    type: 'enum',
    enum: StatusAnimal,
    default: StatusAnimal.IN_OBSERVATION,
  })
  status: StatusAnimal;

  @Column({
    type: 'boolean',
    default: false,
  })
  isSterilized: boolean;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deletedAt?: Date;

}

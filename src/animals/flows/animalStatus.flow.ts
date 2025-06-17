import { StatusAnimal } from '../models/animal.status.model';

export const animalStatusFlow: Record<StatusAnimal, StatusAnimal[]> = {
  [StatusAnimal.IN_OBSERVATION]: [
    StatusAnimal.IN_ADOPTION,
    StatusAnimal.ADOPTED,
    StatusAnimal.DEAD,
  ],
  [StatusAnimal.IN_ADOPTION]: [
    StatusAnimal.IN_OBSERVATION,
    StatusAnimal.ADOPTED,
    StatusAnimal.DEAD,
  ],
  [StatusAnimal.ADOPTED]: [
    StatusAnimal.IN_OBSERVATION,
    StatusAnimal.IN_ADOPTION,
  ],
  [StatusAnimal.DEAD]: [StatusAnimal.DEAD],
};

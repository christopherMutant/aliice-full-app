import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsInDatabaseConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly entityManager: EntityManager) {}

  async validate(
    value: unknown,
    args: ValidationArguments,
  ): Promise<boolean> {
    const [EntityClass, property = 'id'] = args.constraints;
    const repository = this.entityManager.getRepository(EntityClass);
    const row = await repository.findOne({
      where: { [property]: value },
    });
    return !!row;
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} does not exist`;
  }
}

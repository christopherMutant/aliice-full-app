import {
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { IsInDatabaseConstraint } from './is-in-database-constraints';

export function IsInDatabase<Entity>(
  entity: Entity,
  property?: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isInDatabase',
      target: object.constructor,
      propertyName,
      constraints: [entity, property],
      options: validationOptions,
      validator: IsInDatabaseConstraint,
    });
  };
}

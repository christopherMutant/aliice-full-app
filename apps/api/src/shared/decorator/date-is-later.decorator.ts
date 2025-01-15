import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsLaterThan(
  property?: string, // Optional property
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isLaterThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(end: string, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const startDate = relatedPropertyName
            ? new Date(args.object[relatedPropertyName] || new Date()) // Use property or today
            : new Date(); // Default to today if no property provided

          const endDate = new Date(end);
          return startDate < endDate;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return relatedPropertyName
            ? `${args.property} must be later than ${relatedPropertyName}`
            : `${args.property} must be later than today`;
        },
      },
    });
  };
}

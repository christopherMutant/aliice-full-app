export interface ISeeder<Entity> {
  getData: () => Partial<Entity>[];
  uniquenessField: keyof Entity;
  entity: never;
}

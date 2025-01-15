import { Primitive } from './primitive.type';

export type RecursiveObject = {
  [key: string]:
    | RecursiveObject
    | Primitive
    | RecursiveObject[]
    | Primitive[];
};

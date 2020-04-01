/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { MetadataKeys } from '../globals';

export function bodyValidator(...keys: string[]): Function {
  return (target: Record<string, any>, key: string): void => {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}

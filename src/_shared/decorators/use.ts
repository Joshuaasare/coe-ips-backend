/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { MetadataKeys } from '../globals';

export function use(middleware: Function) {
  return (target: Record<string, any>, key: string): void => {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}

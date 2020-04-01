/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods, MetadataKeys } from '../globals';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

function routeBinder(method: string) {
  return (path: string) => {
    return (target: Record<string, any>, key: string): void => {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const put = routeBinder(Methods.put);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);

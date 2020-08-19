import 'reflect-metadata';
import { RequestHandler } from 'express';
import { Methods } from './Methods';
import { MetadatasKeys } from './MetadatasKeys';

interface RouteHandlerDescriptor extends PropertyDescriptor {
	value?: RequestHandler;
}

export function routeBinder(method: string) {
	return function (path: string) {
		return function (
			target: any,
			key: string,
			desc: RouteHandlerDescriptor
		) {
			Reflect.defineMetadata(MetadatasKeys.path, path, target, key);
			Reflect.defineMetadata(MetadatasKeys.method, method, target, key);
		};
	};
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const patch = routeBinder(Methods.patch);
export const del = routeBinder(Methods.del);

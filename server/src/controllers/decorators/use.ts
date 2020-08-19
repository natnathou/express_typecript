import 'reflect-metadata';
import { RequestHandler } from 'express';
import { MetadatasKeys } from './MetadatasKeys';

export function use(midleware: RequestHandler) {
	return function (target: any, key: string, desc: PropertyDescriptor) {
		const midlewares =
			Reflect.getMetadata(MetadatasKeys.midleware, target, key) || [];

		Reflect.defineMetadata(
			MetadatasKeys.midleware,
			[...midlewares, midleware],
			target,
			key
		);
	};
}

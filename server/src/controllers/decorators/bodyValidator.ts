import 'reflect-metadata';
import { MetadatasKeys } from './MetadatasKeys';

export function bodyValidator(...keys: string[]) {
	return function (target: any, key: string, desc: PropertyDescriptor) {
		Reflect.defineMetadata(MetadatasKeys.validator, keys, target, key);
	};
}

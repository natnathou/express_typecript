import 'reflect-metadata';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter';
import { MetadatasKeys } from './MetadatasKeys';
import { Methods } from './Methods';

function bodyValidators(keys: string): RequestHandler {
	return function (req: Request, res: Response, next: NextFunction) {
		if (!req.body) {
			res.status(422).send('Invalid request');
			return;
		}

		for (let key of keys) {
			if (!req.body[key]) {
				res.status(422).send(`Missing property ${key}`);
				return;
			}
		}

		next();
	};
}
export function controller(routePrefix: string) {
	return function (target: Function) {
		const router = AppRouter.getInstance();
		for (let key in target.prototype) {
			const routeHandler = target.prototype[key];
			const path = Reflect.getMetadata(
				MetadatasKeys.path,
				target.prototype,
				key
			);
			const method: Methods = Reflect.getMetadata(
				MetadatasKeys.method,
				target.prototype,
				key
			);

			const midlewares =
				Reflect.getMetadata(
					MetadatasKeys.midleware,
					target.prototype,
					key
				) || [];
			const requiredBodyProps =
				Reflect.getMetadata(
					MetadatasKeys.validator,
					target.prototype,
					key
				) || [];

			const validator = bodyValidators(requiredBodyProps);

			if (path) {
				router[method](
					`${routePrefix}${path}`,
					...midlewares,
					validator,
					routeHandler
				);
			}
		}
	};
}

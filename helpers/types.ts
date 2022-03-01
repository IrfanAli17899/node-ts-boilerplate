/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { User } from ':models/User';

export type EmptyObject = Record<never, any>;
export type AnyObject = Record<string, any>;
export type AnyArray = unknown[];
export type AnyObjectOrArray = AnyObject | AnyArray;
export type Key<T extends AnyObjectOrArray> = keyof T;
export type Val<T extends AnyObjectOrArray> = T[Key<T>];
export type Entry<T extends AnyObjectOrArray> = [Key<T>, Val<T>];
export type MapFunc<AT, RT> = (item: AT, index?: number, array?: AT[]) => RT;
export type Func1<AT = void, RT = void> = (arg: AT) => RT;

export type WithoutTimestamps<T> = Omit<T, 'createdAt' | 'deletedAt' | 'updatedAt'>;
export type ToEnum<O extends AnyObject> = O[keyof O];


export type Response<L extends AnyObject = AnyObject> = ExpressResponse<any, L & { user?: User }>;

export interface Request<
  B extends AnyObject = AnyObject,
  Q extends AnyObject = AnyObject,
> extends ExpressRequest {
  query: Q;
  body: B;
}

export interface RequestHandler {
  (req: Request, res: Response, next?: NextFunction): void;
}

export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

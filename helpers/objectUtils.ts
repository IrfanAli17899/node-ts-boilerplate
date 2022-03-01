/* eslint-disable no-undefined */
import {
  AnyArray,
  AnyObject,
  AnyObjectOrArray,
  Entry,
  MapFunc,
  Key,
} from './types';

export const omitUndefined = <T extends AnyObjectOrArray>(object: T): T => (
  Array.isArray(object)
    ? object.filter((value) => value !== undefined)
    : Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined))
) as T;

export const omitNullish = <T extends AnyObjectOrArray>(object: T): T => (
  Array.isArray(object)
    ? object.filter((value) => value != null)
    : Object.fromEntries(Object.entries(object).filter(([, value]) => value != null))
) as T;

export const some = {
  isTruthy: (object: AnyObjectOrArray): boolean => Object.values(object).some((v) => v),
  isFalsy: (object: AnyObjectOrArray): boolean => Object.values(object).some((v) => !v),
  isUndefined: (object: AnyObjectOrArray): boolean => Object.values(object).some((v) => v === undefined),
  isNullish: (object: AnyObjectOrArray): boolean => Object.values(object).some((v) => v == null),
};

export const every = {
  isTruthy: (object: AnyObjectOrArray): boolean => Object.values(object).every((v) => v),
  isFalsy: (object: AnyObjectOrArray): boolean => Object.values(object).every((v) => !v),
  isUndefined: (object: AnyObjectOrArray): boolean => Object.values(object).every((v) => v === undefined),
  isNullish: (object: AnyObjectOrArray): boolean => Object.values(object).every((v) => v == null),
};

export const hasLength = (array: AnyArray): boolean => !!(array?.length);
export const isEmpty = (object: AnyObjectOrArray): boolean => !(object && Object.keys(object).length);

export const reconstruct = <T extends AnyObject, F extends MapFunc<Entry<T>, [string, unknown]>>(
  object: T, func: F,
): Record<ReturnType<F>[0], ReturnType<F>[1]> => {
  return Object.fromEntries(
    Object.entries(object).map(func as MapFunc<[string, unknown], [string, unknown]>),
  ) as Record<ReturnType<F>[0], ReturnType<F>[1]>;
};

export const invert = <T extends Record<string, string[]>>(obj: T): Record<string, Key<T>> => {
  return Object.fromEntries(
    Object.entries(obj).flatMap(([key, values]) => [values].flat().map((value) => [value, key])),
  ) as Record<string, Key<T>>;
};

export const mapToProp = <T, P extends keyof T>(objArr: T[], prop: P): T[P][] => {
  return objArr.map((obj) => obj[prop]);
};

import { Func1, MapFunc } from './types';

export const timeout = (ms: number): Promise<void> => {
  return new Promise((res) => { setTimeout(res, ms); });
};

export const interval = <RT>(ms: number, func: (res: Func1<RT>, rej: Func1<Error>) => void): Promise<RT> => {
  return new Promise((res, rej) => {
    func(res, rej);
    const int = setInterval(() => func(
      (value) => { clearInterval(int); res(value); },
      (error) => { clearInterval(int); rej(error); },
    ), ms);
  });
};

export const mapAsync = <T, RT>(array: T[], asyncMapFunc: MapFunc<T, RT | Promise<RT>>): Promise<RT[]> => {
  return Promise.all(array.map(asyncMapFunc));
};

export const mapAsyncInSlices = async <T, RT>(
  array: T[],
  sliceSize: number,
  asyncMapFunc: MapFunc<T, RT | Promise<RT>>,
): Promise<RT[]> => {
  // eslint-disable-next-line no-param-reassign
  if (!sliceSize) sliceSize = array.length;
  const result = [];
  let sliceStart = 0;

  while (sliceStart < array.length) {
    result.push(
      // eslint-disable-next-line no-await-in-loop
      ...(await Promise.all(
        array.slice(sliceStart, sliceStart + sliceSize).map(asyncMapFunc),
      )),
    );
    sliceStart += sliceSize;
  }

  return result;
};

export const asyncOr = async <RT>(...alternatives: Array<(...args: unknown[]) => RT>): Promise<RT> => {
  let result = null;

  const alts = alternatives.flat();

  for (let i = 0; i < alts.length && !result; i++) {
    // eslint-disable-next-line no-await-in-loop
    result = await alts[i]();
  }

  return result;
};

/**
 * Works like `await fn1() || await fn2() || await fn3() || ...`
 * @template T
 * @param {(() => T[] | Promise<T[]>)[] | [(() => T[] | Promise<T[]>)[]]} alternatives
 * @returns {Promise<Array<T>>>}
 */
export const asyncLengthOr = async <RT>(...alternatives: Array<(...args: unknown[]) => RT>): Promise<RT> => {
  let result = null;

  const alts = alternatives.flat();

  for (let i = 0; i < alts.length && !(result?.length); i++) {
    // eslint-disable-next-line no-await-in-loop
    result = await alts[i]();
  }

  return result;
};


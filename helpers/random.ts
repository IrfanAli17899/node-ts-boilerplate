export function randRange(min: number, max: number, integers = true): number {
  const value = min + (Math.random() * (max + +integers - min));
  return integers ? Math.floor(value) : value;
}

type ArrOrStr = any[] | string;
type ArrElemtOrChar<T> = T extends Array<infer RT> ? RT : string;

export function randChoice<AT extends ArrOrStr>(array: AT): ArrElemtOrChar<AT> {
  return array[randRange(0, array.length - 1)];
}

export function randBool(trueChance = 0.5): boolean {
  return (Math.random() - trueChance) < 0;
}

export interface RandStringOptions {
  letters?: boolean;
  numbers?: boolean;
  capitals?: boolean;
  specials?: boolean;
}

export function randString(length: number, options: RandStringOptions = {}): string {
  const {
    letters = true,
    numbers = true,
    capitals = true,
    specials = false,
  } = options;

  let result = '';

  if (!letters && !numbers) {
    return result;
  }

  while (result.length < length) {
    let additive = Math.random().toString(36).slice(2, 12);
    if (!letters) additive = additive.replace(/[a-z]/ig, '');
    if (!numbers) additive = additive.replace(/\d/g, '');
    if (capitals) additive = additive.replace(/./g, (char) => (randBool() ? char.toUpperCase() : char));
    if (specials) additive = additive.replace(/./g, (char) => (randBool(0.1) ? randChoice('#)(!_-+') : char));
    result += additive;
  }

  return result.slice(0, length);
}

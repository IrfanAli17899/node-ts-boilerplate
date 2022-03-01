import { Model } from 'sequelize';
import { AnyObject } from './types';

export function setDataValue(instance: Model, name: string, value: unknown): void {
  instance.setDataValue(name, value);
  Object.defineProperty(instance, name, {
    get() { return this.dataValues[name]; },
    set(val) { this.dataValues[name] = val; },
  });
}

export function removeDataValue(instance: Model, name: string): void {
  delete (instance as AnyObject).dataValues[name];
  delete (instance as AnyObject)[name];
}

import { Schema } from 'joi';

type Func<AT extends any[], RT> = (...args: AT) => RT;

function validateArgs<F extends Func<any[], any>>(func: F, argsSchemas: Schema[]): Func<Parameters<F>, ReturnType<F>> {
  const isAsync = func.constructor.name === 'AsyncFunction';

  if (!isAsync && func.constructor.name !== 'Function') {
    throw new Error('func parameter must be a function');
  }

  return (...args: Parameters<F>): ReturnType<F> => {
    let validArgs: Parameters<F> = null;

    try {
      validArgs = argsSchemas.map((schema, idx) => {
        const { value, error } = schema.validate(args[idx]);
        if (error) throw new Error(error.message.replace('"value"', `arg${idx}`));
        return value;
      }) as Parameters<F>;
    } catch (err) {
      if (isAsync) return Promise.reject(err) as ReturnType<F>;
      throw err;
    }

    return func(...validArgs) as ReturnType<F>;
  };
}

export default validateArgs;

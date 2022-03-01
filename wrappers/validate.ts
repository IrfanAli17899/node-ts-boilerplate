import { Schema } from 'joi';
import { reqQueryValidator, reqBodyValidator } from ':middlewares/validation';
import { RequestHandlerWrapper } from '.';

export interface RequestSchemas {
  reqQuery?: Schema;
  reqBody?: Schema;
}

const validate = (schemas: RequestSchemas = {}): RequestHandlerWrapper => (handler) => {
  const thisReqQueryValidator = schemas.reqQuery ? reqQueryValidator(schemas.reqQuery) : null;
  const thisReqBodyValidator = schemas.reqBody ? reqBodyValidator(schemas.reqBody) : null;

  return async (req, res, next) => {
    if (thisReqQueryValidator) {
      const errOnQueryValidation = await new Promise(
        (resolve) => { thisReqQueryValidator(req, res, resolve); },
      ).catch((error) => error);

      if (errOnQueryValidation instanceof Error) {
        next(errOnQueryValidation);
        return;
      }
    }

    if (thisReqBodyValidator) {
      const errOnBodyValidation = await new Promise(
        (resolve) => { thisReqBodyValidator(req, res, resolve); },
      ).catch((error) => error);

      if (errOnBodyValidation instanceof Error) {
        next(errOnBodyValidation);
        return;
      }
    }

    const originSend = res.send;

    const newNext = (err) => {
      res.send = originSend;
      next(err);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (res as any).send = (responseBody) => {
      res.send = originSend;
      res.send({ success: true, data: responseBody });
    };

    try {
      await handler(req, res, newNext);
    } finally {
      res.send = originSend;
    }
  };
};


export default validate;

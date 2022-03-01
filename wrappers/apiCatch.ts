import { RequestHandlerWrapper } from '.';

const apiCatch: RequestHandlerWrapper = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default apiCatch;

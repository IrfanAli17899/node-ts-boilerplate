import { NextFunction } from 'express';

import { createLogger } from ':helpers/logger';
import { Request, Response } from ':helpers/types';
import ApiError from ':helpers/ApiError';

const logger = createLogger('🛑 Api Error Handler');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (err: Error | ApiError, req: Request, res: Response, _next: NextFunction) {
  logger.warn(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status('status' in err ? err.status : 500).send({
    success: false,
    message: err.message,
  });
}

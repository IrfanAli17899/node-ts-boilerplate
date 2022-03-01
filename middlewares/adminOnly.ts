import { NextFunction } from 'express';

import ApiError from ':helpers/ApiError';
import { Request, Response } from ':helpers/types';

export default function (_req: Request, res: Response, next: NextFunction) {
  if (res.locals.user?.is_admin) next();
  else next(new ApiError(403, 'Admin privileges required'));
}

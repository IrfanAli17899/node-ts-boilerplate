import { NextFunction } from 'express';

import ApiError from ':helpers/ApiError';
import { Request, Response } from ':helpers/types';

interface RequestWithUser extends Request {
  user?: { sub: string };
}

export default function (req: RequestWithUser, _res: Response, next: NextFunction) {
  if (req.user?.sub) next();
  else next(new ApiError(401, 'Not authenticated'));
}

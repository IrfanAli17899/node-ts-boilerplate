import ApiError from ':helpers/ApiError';
import { RequestHandlerWrapper } from '.';

const authedOnly: RequestHandlerWrapper = (handler) => (req, res, next) => {
  if (res.locals.user) {
    handler(req, res, next);
  } else {
    next(new ApiError(401, 'Not authenticated'));
  }
};

export default authedOnly;

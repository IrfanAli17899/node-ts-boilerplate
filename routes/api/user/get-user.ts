import joi from 'joi';

import { wrap } from ':wrappers';

import { Request, Response } from ':helpers/types';

const getUserSchemas = {
  reqQuery: joi.object().length(0),
  reqBody: joi.object().length(0),
};

function getUser(_req: Request, res: Response) {
  const { user } = res.locals;
  res.send(user);
}

export default wrap(getUser, {
  catch: true,
  authedOnly: true,
  validate: getUserSchemas,
});

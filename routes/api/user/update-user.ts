import joi from 'joi';

import { wrap } from ':wrappers';

import { Request, Response } from ':helpers/types';
import { omitUndefined } from ':helpers/objectUtils';


const updateUserSchemas = {
  reqQuery: joi.object().length(0),
  reqBody: joi.object({
    about_me: joi.string().example('I\'m kul boi'),
    name: joi.string().example('Jimmy Two Jackets'),
    email: joi.string().example('email@domain.com'),
    birth_date: joi.date(),
    address: joi.string().example('Lemon Str'),
    city: joi.string().example('London'),
    country: joi.string().example('England'),
    postal_code: joi.string().example('E1 6AN'),
    language: joi.string().optional(),
    settings: joi.object(),
    avatar: joi.string().optional(),
    phone_number: joi.string().optional(),
  }),
};

interface UpdateUserBody {
  about_me?: string;
  name?: string;
  email?: string;
  birth_date?: Date;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  settings?: Record<string, unknown>;
  avatar?: string;
  language?: string;
  phone_number?: string;
}


async function updateUser(
  req: Request<UpdateUserBody>,
  res: Response,
) {
  const { user } = res.locals;

  await user.update(
    omitUndefined({ ...req.body }),
    { where: { auth_id: res.locals.user.auth_id } },
  );

  res.send(user);
}


export default wrap(updateUser, {
  catch: true,
  authedOnly: true,
  validate: updateUserSchemas,
});

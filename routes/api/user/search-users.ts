import joi from 'joi';
import { Response } from 'express';
import { Op } from 'sequelize';

import { Request } from ':helpers/types';
import { wrap } from ':wrappers';
import { User } from ':models/User';

const searchUsersSchemas = {
  reqQuery: joi.object({
    email: joi.string().optional(),
  }),
  reqBody: joi.object().length(0),
};

async function searchUsers(
  req: Request,
  res: Response,
) {
  const { email } = req.query;
  const users = await User.findAll(
    {
      where: {
        email: { [Op.iLike]: `%${email || ''}%` },
        auth_id: {
          [Op.and]: { [Op.ne]: res.locals.user.auth_id },
        },
      },
    },
  );
  res.send(users);
}

export default wrap(searchUsers, {
  catch: true,
  authedOnly: true,
  validate: searchUsersSchemas,
});

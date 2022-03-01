import joi from 'joi';
import { Response } from 'express';
import axios from 'axios';

import { User } from ':models';

import { authConfig } from ':config';
import { wrap } from ':wrappers';

import { Request } from ':helpers/types';
import ApiError from ':helpers/ApiError';


const deleteUserSchemas = {
  reqQuery: joi.object().length(0),
  reqBody: joi.object({
    user_auth_id: joi.string().optional(),
  }),
};

interface DeleteUserBody {
  user_auth_id?: string;
}

// TODO cascade delete or check all dependent objects
async function deleteUser(req: Request<DeleteUserBody>, res: Response) {
  const { user_auth_id } = req.body;
  const user_id = user_auth_id || res.locals.user.auth_id;
  if (user_auth_id && !res.locals.user.is_admin) {
    throw new ApiError(403, 'You are not allowed to delete other users');
  }
  const user = await User.findByPk(user_id);
  if (!user) throw new ApiError(404, 'User not found');

  await axios.delete(
    `https://${authConfig.authApiUrl}/api/v2/users/${user_id}`,
    { headers: { Authorization: `Bearer ${authConfig.authApiToken}` } },
  );

  user.destroy();
  res.send();
}

export default wrap(deleteUser, {
  catch: true,
  authedOnly: true,
  validate: deleteUserSchemas,
});

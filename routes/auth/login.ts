import joi from 'joi';
import axios from 'axios';
import qs from 'qs';

import { authConfig } from ':config';
import { wrap } from ':wrappers';

import { Request, Response } from ':helpers/types';
import ApiError from ':helpers/ApiError';


const loginSchemas = {
  reqQuery: joi.object().length(0),
  reqBody: joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().required(),
  }),
};

interface LoginBody {
  email: string;
  password: string;
}


async function login(req: Request<LoginBody>, res: Response) {
  const body = {
    audience: authConfig.audience,
    grant_type: 'password',
    username: req.body.email,
    password: req.body.password,
    client_id: authConfig.clientId,
    client_secret: authConfig.clientSecret,
  };

  const { data } = await axios
    .post(
      `https://${authConfig.authApiUrl}/oauth/token`,
      qs.stringify(body),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
    .catch((err) => {
      throw new ApiError(403, err.response.data.error_description);
    });

  res.send({
    token: data.access_token,
    email: req.body.email,
  });
}

export default wrap(login, {
  catch: true,
  validate: loginSchemas,
});

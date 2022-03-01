import joi from 'joi';
import axios from 'axios';
import qs from 'qs';

import { wrap } from ':wrappers';
import { authConfig } from ':config';

import { Request, Response } from ':helpers/types';
import ApiError from ':helpers/ApiError';


const signupSchemas = {
  reqQuery: joi.object().length(0),
  reqBody: joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{6,}$/)
      // eslint-disable-next-line max-len
      .message('Password must be at least eight characters long and contain at least one uppercase letter, one lowercase letter, one digit and one special character'),
  }),
};

interface SignupBody {
  email: string;
  password: string;
}


async function signup(
  req: Request<SignupBody>,
  res: Response,
) {
  const body = {
    client_id: authConfig.clientId,
    email: req.body.email,
    password: req.body.password,
    connection: 'Username-Password-Authentication',
  };

  const { data } = await axios
    .post(
      `https://${authConfig.authApiUrl}/dbconnections/signup`,
      qs.stringify(body),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
    .catch((err) => {
      throw new ApiError(403, err.response.data.description);
    });
  res.send(data.email);
}


export default wrap(signup, {
  catch: true,
  validate: signupSchemas,
});

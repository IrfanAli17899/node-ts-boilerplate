import axios from 'axios';
import qs from 'qs';

import ApiError from ':helpers/ApiError';
import { authConfig } from ':config';


export async function login(email: string, password: string): Promise<{ token: string; email: string }> {
  const body = {
    audience: authConfig.audience,
    grant_type: 'password',
    username: email,
    password,
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

  return { token: data.access_token, email };
}


export async function signup(email: string, password: string): Promise<string> {
  const body = {
    client_id: authConfig.clientId,
    email,
    password,
    connection: 'Username-Password-Authentication',
  };

  const { data } = await axios
    .post(
      `https://${authConfig.authApiUrl}/dbconnections/signup`,
      qs.stringify(body),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

  return data.email;
}

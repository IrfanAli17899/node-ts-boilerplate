import axios from 'axios';

import { authConfig } from ':config';
import { User } from ':models';
import { wrap } from ':wrappers';
import { Request, Response } from ':helpers/types';


interface LinkUserBody {
  user_id: string;
  strategy: string;
  email: string;
}

async function linkUser(req: Request<LinkUserBody>, res: Response) {
  const { user_id, strategy, email } = req.body;
  const foundUser = await User.findOne({ where: { email } });

  if (foundUser && foundUser.auth_id !== user_id) {
    await axios.post(
      `https://${authConfig.authApiUrl}/api/v2/users/${foundUser.auth_id}/identities`,
      { provider: strategy, user_id },
      { headers: { Authorization: `Bearer ${authConfig.authApiToken}` } },
    );
  }

  res.send({ sub: foundUser?.auth_id });
}


export default wrap(linkUser, {
  catch: true,
});

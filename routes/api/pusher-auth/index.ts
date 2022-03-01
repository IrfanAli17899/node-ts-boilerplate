import { Router } from 'express';

import authedOnly from ':middlewares/authedOnly';
import pusherAuth from './pusher-auth';

export default Router().post(
  '/',
  authedOnly,
  ...pusherAuth,
);

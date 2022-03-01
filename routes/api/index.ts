import { Router } from 'express';

import { jwtCheck } from ':middlewares';

import pusherAuth from './pusher-auth';
import user from './user';

export default Router()
  .use('/', jwtCheck)
  .use('/pusher-auth', pusherAuth)
  .use('/user', user);

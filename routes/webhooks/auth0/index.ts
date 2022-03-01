import { Router } from 'express';

import linkUser from './link-user';

export default Router()
  .post('/link-user', linkUser);

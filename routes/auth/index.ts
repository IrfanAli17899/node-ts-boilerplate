import { Router } from 'express';

import login from './login';
import signup from './signup';

export default Router()
  .post('/login', login)
  .post('/signup', signup);

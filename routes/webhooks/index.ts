import { Router } from 'express';

import auth0Route from './auth0';

export default Router()
  .use('/auth0', auth0Route);

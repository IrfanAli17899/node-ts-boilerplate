import { Router } from 'express';

import apiRoute from './api';
import authRoute from './auth';
import webhooksRoute from './webhooks';

export default Router()
  .use('/auth', authRoute)
  .use('/api/v1', apiRoute)
  .use('/webhooks', webhooksRoute);

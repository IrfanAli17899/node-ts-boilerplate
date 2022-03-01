import { Router } from 'express';

import getUser from './get-user';
import searchUsers from './search-users';
import updateUser from './update-user';
import deleteUser from './delete-user';

export default Router()
  .get('/', getUser)
  .get('/search', searchUsers)
  .post('/update', updateUser)
  .delete('/', deleteUser);

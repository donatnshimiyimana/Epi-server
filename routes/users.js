import express from 'express';

import { createUser } from '../controllers/users';
import { getOneUser } from '../controllers/users';
import { modifyUser } from '../controllers/users';
import { deleteUser } from '../controllers/users';
import { getAllUsers } from '../controllers/users';

import { jsonParser } from '../bodyParser';
import { modifyUser } from './../controllers/users';

const userRouter = express.Router();

userRouter.route('/')
  .post(jsonParser, createUser)
  .get(getAllUsers);

userRouter.route('/:id')
  .get(getOneUser)
  .delete(deleteUser)
  .patch(jsonParser, modifyUser);

export default userRouter;
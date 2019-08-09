import * as express from 'express';

import { checkToken } from '../../utils/routerMiddleware';

import blogsRouter from './blogs';
import allTagsRouter from './allTags';
import usersRouter from './users';
import tagsRouter from './tags';

const router = express.Router();

// this needs to be above all other routers to verify
router.use(checkToken);

router.use('/blogs', blogsRouter);
router.use('/allTags', allTagsRouter);
router.use('/users', usersRouter);
router.use('/tags', tagsRouter);


export default router;
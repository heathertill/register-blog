import * as express from 'express';

import chargeRouter from './charge';

const router = express.Router();

router.use('/charge', chargeRouter);

export default router;


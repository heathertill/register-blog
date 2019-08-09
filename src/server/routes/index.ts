import * as express from 'express';

import authRouter from './auth';
import apiRouter from './api';
import paymentRouter from './payment';
import mailgunRouter from './mailgun';

const router = express.Router();

router.use('/mailgun', mailgunRouter);
router.use('/payment', paymentRouter);
router.use('/auth', authRouter);
router.use('/api', apiRouter);

export default router;


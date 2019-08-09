import * as express from 'express';
import { sendEmail } from '../../utils/mailgun/email'

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        await sendEmail('ktill6927@charter.net', req.body.email, req.body.subject, req.body.message);
        res.send('Email sent!');
    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

export default router;
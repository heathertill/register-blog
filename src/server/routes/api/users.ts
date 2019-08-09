import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/:firstname', async (req, res, next) => {
    try {
        let userid = await queries.Users.getUserId((req.params.firstname))
        res.json(userid);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;
import * as express from 'express';

import queries from '../../db';
import { HashPassword } from '../../utils/security/password';
import { CreateToken } from '../../utils/security/tokens';

const router = express.Router();

router.post('/', async (req, res, next) => {
    console.log('auth/reg/ding')
    try {
        let user = req.body;
        req.user.password = HashPassword(req.body.password);
        let [result]: any = await queries.Users.insert(user);
        let token = await CreateToken({ userid: result.insertId });
        res.json({
            token,
            role: 'guest',
            userid: result.insertId
        })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})


export default router;
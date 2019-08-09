import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/:selectTag', async (req, res, next) => {
    let id = req.params.selectTag;
    try {
        let tags = await queries.AllTags.allOneTag(id);
        res.json(tags);
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});

export default router
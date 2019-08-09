import { Router } from 'express';
import queries from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let tags = await queries.Tags.getAllTags();
        res.json(tags);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/:blogid', async (req, res, next) => {
    let blogid = req.params.blogid;
    try {
        let [id] = await queries.Tags.getTag(blogid);
        res.json(id);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {
    try {
        await queries.Tags.createBlogTag(req.body);
        res.json({ message: 'Blogged!' });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:blogid', async (req, res, next) => {
    let blogid = req.params.blogid;
    try {
        await queries.Tags.deleteBlogTag(blogid);
        res.json({ message: 'Blogged!' });
    } catch (err) {
        console.log(err)
    }
});

export default router;
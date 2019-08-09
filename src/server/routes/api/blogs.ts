import { Router } from 'express';
import queries from '../../db';

import { isAdmin } from '../../utils/routerMiddleware';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        let blogs = await queries.Blogs.all();
        res.json(blogs);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
});

// router.get('/:id?', isAdmin, async (req, res, next) => {
router.get('/:id?', async (req, res, next) => {
    let id = req.params.id
    try {
        let [blog] = await queries.Blogs.one(id)
            res.json(blog);
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
});

router.post('/', isAdmin, async (req, res, next) => {
    let blogBody = req.body;
    try {
        let newBlog = await queries.Blogs.createBlog(blogBody, blogBody.id);
        res.json(newBlog);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res, next) => {
    let id = req.params.id;
    let blogBody = req.body;
    try {
        await queries.Blogs.updateBlog(blogBody, id)
        res.json({ message: 'Blogged' })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.delete('/:id', async (req, res, next) => {
    let id = req.params.id
    try {
        await queries.Blogs.deleteBlog(id)
        res.json({ message: 'Blogged' })
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;
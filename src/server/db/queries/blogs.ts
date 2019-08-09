import { connection as knex } from '../index';

const all = () => knex('blogs').select('blogs.id', 'users.firstname', 'blogs.title', 'blogs.content', 'blogs._created').join('users', 'blogs.userid', '=', 'users.id').orderBy('_created', 'desc');
const one = (id: number) => knex('blogs').select('blogs.id', 'users.firstname', 'blogs.title', 'blogs.content', 'blogs._created', 'blogs.userid').join('users', 'blogs.userid', '=', 'users.id').where('blogs.id', id);
const createBlog = (blogObject: any, userid: string) => knex('blogs').insert(blogObject, userid);
const updateBlog = (blogObject: any, id: number) => knex('blogs').where('id', '=', id).update(blogObject);
const deleteBlog = (id: number) => knex('blogs').where('id', id).del();

export default {
    all,
    one,
    createBlog,
    updateBlog,
    deleteBlog
}
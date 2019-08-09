import { connection as knex } from '../index';

const getTag = (blogid: number) => knex('tags').where('blogTags.blogid', blogid).select('tags.id', 'tags.name').join('blogTags', 'blogTags.tagid', '=', 'tags.id');
const createBlogTag = (blogObject: any) => knex('blogTags').insert(blogObject);
const getAllTags = () => knex('tags').select('name', 'id');
const deleteBlogTag = (blogid: number) => knex('blogTags').where('blogid', blogid).del();

export default {
    createBlogTag,
    deleteBlogTag,
    getTag,
    getAllTags
}

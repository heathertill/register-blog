import { connection as knex } from '../index';

const getUserId = (name: string) => knex('users').where('firstname', name).select('id');
const findOneByEmail = (email: string) => knex('users').where('email', email).select().limit(1);
const findOneById = (id: number) => knex('users').where('id', id).select();
const insert = (userObject: any) => knex('users').insert(userObject)

export default {
    getUserId,
    findOneByEmail,
    findOneById,
    insert
}

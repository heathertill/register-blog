import { connection as knex } from '../index';

const findOne = (id: string, token: string) => knex('accesstokens').where('id', id).andWhere('token', token).select();
const insert = (userid: number) => knex('accesstokens').insert({userid});
const update = (id: number, token: string) => knex('accesstokens').where('id', id).update('token', token);

export default {
    findOne,
    insert,
    update
}

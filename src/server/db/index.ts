import * as mysql from 'mysql';
import config from '../config';
import * as knex from 'knex';

import Blogs from './queries/blogs';
import Tags from './queries/tags';
import Users from './queries/users';
import AllTags from './queries/allTags';
import AccessTokens from './queries/accesstokens'

//node - mysql connection pool
// export const pool = mysql.createPool(config.mysql);

export const connection = knex(config.knex);

// export const Query = (query: string, values?: Array<string | number>) => {
//     return new Promise<Array<any>>((resolve, reject) => {
//         pool.query(query, values, (err, results) => {
//             if (err) reject(err);
//             return resolve(results);
//         })
//     })
// }


export default {
    Blogs,
    Tags,
    Users,
    AllTags,
    AccessTokens
}
import config from '../config';
import * as knex from 'knex';

import Blogs from './queries/blogs';
import Tags from './queries/tags';
import Users from './queries/users';
import AllTags from './queries/allTags';
import AccessTokens from './queries/accesstokens'

export const connection = knex(config.knex);


export default {
    Blogs,
    Tags,
    Users,
    AllTags,
    AccessTokens
}
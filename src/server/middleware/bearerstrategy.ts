import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';

import { ValidToken } from '../utils/security/tokens';
import queries from '../db';

// used by middlewareRouter/isAdmin to confirm user credentials
passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload = await ValidToken(token);
        let [user] = await queries.Users.findOneById(payload.userid);
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        done(err);
    }
}));
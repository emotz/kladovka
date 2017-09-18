const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const CONFIG = require('../../../domain/src/config.js');
const klad = require('../../../domain/src/main');
const User = require('../../../domain/src/User');
const errors = require('../../../domain/src/errors');

const COLLECTIONS = {
    ITEMS: 'items',
    CHARS: 'chars',
    USERS: 'users'
};

const FIELDS = {
    EMAIL: 'email',
    NAME: 'name',
    PASSWORD: 'password'
};

passport.use(new LocalStrategy(
    {
        usernameField: FIELDS.EMAIL,
        passwordField: FIELDS.PASSWORD,
        session: false
    },
    async function (email, password, done) {
        let user,
            err = null;
        try {
            user = await klad.getByPropFromKladovka(COLLECTIONS.USERS, FIELDS.EMAIL, email);
            if (!user || !User.comparePasswords(user, password))
                user = false;
        } catch (err) {
            return done(err);
        }
        return done(err, user);
    })
);

passport.use(new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: CONFIG.JWT_SECRET,
        session: false
    },
    async function (payload, done) {
        let user,
            info,
            err = null;
        try {
            user = await klad.getFromKladovka(COLLECTIONS.USERS, payload._id);
            if (user === null)
                info = errors.makeAuthorizationError([{ id: "idNotExists", properties: ["_id"] }]);
        } catch (err) {
            return done(err);
        }
        return done(err, user, info);
    })
);
module.exports = passport;

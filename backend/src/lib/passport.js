const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const CONFIG = require('../../../config/config.json');
const klad = require('../../../domain/src/main');
const User = require('../../../domain/src/User');


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async function (email, password, done) {
        let user,
            err = null;
        try {
            user = await klad.getByPropFromKladovka('users', 'email', email);
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
        secretOrKey: CONFIG.JWT_SECRET
    },
    async function (payload, done) {
        let user,
            err = null;
        try {
            user = await klad.getFromKladovka('users', payload._id);
        } catch (err) {
            return done(err);
        }
        return done(err, user);
    })
);
module.exports = passport;
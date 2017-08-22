require('express-async-errors');
const logger = require('./lib/logger.js');
const fs = require('fs');
const CONFIG = require('../../config/config.json');
const API = require('../../config/api.json');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const urlJoin = require('url-join');
const User = require('../../domain/src/User');
const klad = require('../../domain/src/main');
const errors = require('../../domain/src/errors');
const ERROR_CODES = require('../../domain/src/errors').ERROR_CODES;
const validation = require('../../domain/src/validation');
const verification = require('../../domain/src/verification');
const passport = require('./lib/passport');
const jwt = require('jsonwebtoken');
let app = express();

const COLLECTIONS = {
    ITEMS: 'items',
    CHARS: 'chars',
    USERS: 'users'
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../../frontend/dist')));
app.use(passport.initialize());

function authMiddle(req, res, next) {
    passport.authenticate('jwt', handleAuth)(req, res, next);

    function handleAuth(err, user, info) {
        if (err) return next(err);
        if (user === false && err === null) {
            return next({
                code: ERROR_CODES.AUTHORIZATION
            });
        }
        req.user = user;
        return next();
    }
}

app.post(API.ITEMS, authMiddle, async function (req, res, next) {
    const user = req.user;
    let item = req.body;
    let validationResult = validation.checkItem(item);
    if (validationResult.isValid) {
        validationResult.item.user_id = user._id;
        let added_id = await klad.addInKladovka(COLLECTIONS.ITEMS, validationResult.item);
        res.header('Location', urlJoin(API.ITEMS, added_id));
        res.status(201).send({ added_id });
    } else
        return next(errors.makeValidationError(validationResult.errors));
});

app.post(API["ITEMS-COLLECTION"], authMiddle, async function (req, res, next) {
    const user = req.user;
    let collection = req.body;
    let validationResult = validation.checkCollection(collection);
    if (validationResult.isValid) {
        validationResult.collection.map(item => {
            item.user_id = user._id;
            return item;
        });
        let inserted_count = await klad.addItemsInKladovka(COLLECTIONS.ITEMS, validationResult.collection);
        res.status(201).send({ inserted_count });
    } else
        return next(errors.makeValidationError(validationResult.errors));
});

app.get(API.ITEMS, authMiddle, async function (req, res, next) {
    const user = req.user;
    let all = await klad.getAllByPropFromKladovka(COLLECTIONS.ITEMS, 'user_id', user._id);
    res.status(200).send(all);
});

app.get(urlJoin(API.ITEMS, ':id'), authMiddle, async function (req, res, next) {
    let item = await klad.getFromKladovka(COLLECTIONS.ITEMS, req.params.id);
    if (item === null)
        res.sendStatus(404);
    else
        res.status(200).send(item);
});

app.delete(API.ITEMS, authMiddle, async function (req, res, next) {
    const user = req.user;
    let deleted_count = await klad.deleteAllByPropFromKladovka(COLLECTIONS.ITEMS, 'user_id', user._id);
    res.status(200).send({ deleted_count });
});

app.delete(urlJoin(API.ITEMS, ':id'), authMiddle, async function (req, res, next) {
    await klad.deleteFromKladovka(COLLECTIONS.ITEMS, req.params.id);
    res.sendStatus(204);
});

app.post(API.CHARS, authMiddle, async function (req, res, next) {
    const user = req.user;
    const char = req.body;
    let validationResult = validation.checkChar(char);
    if (validationResult.isValid) {
        validationResult.char.user_id = user._id;
        let added_id = await klad.addInKladovka(COLLECTIONS.CHARS, validationResult.char);
        res.header('Location', urlJoin(API.CHARS, added_id));
        res.status(201).send({ added_id });
    } else
        return next(errors.makeValidationError(validationResult.errors));
});

app.put(urlJoin(API.CHARS, ':id'), authMiddle, async function (req, res, next) {
    const user = req.user;
    const char = req.body;
    let validationResult = validation.checkChar(char);
    if (validationResult.isValid) {
        validationResult.char.user_id = user._id;
        if (await klad.replaceInKladovka(COLLECTIONS.CHARS, req.params.id, validationResult.char))
            res.sendStatus(204);
        else
            res.sendStatus(404);
    } else
        return next(errors.makeValidationError(validationResult.errors));
});

app.get(API.CHARS, authMiddle, async function (req, res, next) {
    const user = req.user;
    let char = await klad.getByPropFromKladovka(COLLECTIONS.CHARS, 'user_id', user._id);
    if (char === null)
        res.sendStatus(204);
    else
        res.status(200).send(char);
});

app.delete(API.CHARS, authMiddle, async function (req, res, next) {
    const user = req.user;
    let deleted_count = await klad.deleteAllByPropFromKladovka(COLLECTIONS.CHARS, 'user_id', user._id);
    res.status(200).send({ deleted_count });
});

app.post(API.USERS, async function (req, res, next) {
    let user = req.body;
    let validationResult = await validation.checkSignUp(user);
    if (validationResult.isValid) {
        let verificationResult = await verification.checkSignUp(user);
        if (verificationResult.isVerified) {
            let readyUser = User.readyToSave(validationResult.user);
            let added_id = await klad.addInKladovka(COLLECTIONS.USERS, readyUser);
            res.header('Location', urlJoin(API.USERS, added_id));
            res.status(201).send({ added_id });
        } else
            return next(errors.makeVerificationError(verificationResult.errors));

    } else
        return next(errors.makeValidationError(validationResult.errors));
});

app.post(API.TOKENS, async function (req, res, next) {
    let user = req.body;
    let validationResult = await validation.checkSignIn(user);
    if (validationResult.isValid) {
        passport.authenticate('local', function (err, user) {
            if (err) next(err);
            else if (user === false)
                next(errors.makeAuthenticationError([{ id: "emailOrPasswordInvalid", properties: ["email", "password"] }]));
            else {
                let payload = {
                    _id: user._id,
                    user: user.name,
                    email: user.email
                };
                let token = jwt.sign(payload, CONFIG.JWT_SECRET);
                res.status(200).send({
                    user: user.name,
                    accessToken: token
                });
            }
        })(req, res, next);
    } else
        return next(errors.makeValidationError(validationResult.errors));
});

app.use(function (err, req, res, next) {
    switch (err.code) {
        case ERROR_CODES.VALIDATION:
            res.status(400).send(err);
            return;
        case ERROR_CODES.VERIFICATION:
            res.status(409).send(err);
            return;
        case ERROR_CODES.AUTHENTICATION:
            res.status(400).send(err);
            return;
        case ERROR_CODES.AUTHORIZATION:
            res.status(401).send(err);
            return;
        default:
            res.sendStatus(500);
            return;
    }
});

app.listen(CONFIG.EXPRESS_PORT, async function () {
    logger.info('Server run on port: ' + CONFIG.EXPRESS_PORT);
    await klad.connect(CONFIG.DB_URL);
});

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

app.post(API.ITEMS, async function (req, res) {
    let item = req.body;
    let validationResult = validation.checkItem(item);
    if (validationResult.isValid) {
        let added_id = await klad.placeInKladovka(COLLECTIONS.ITEMS, validationResult.item);
        res.header('Location', urlJoin(API.ITEMS, added_id));
        res.status(201).send({ added_id });
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.get(API.ITEMS, async function (req, res) {
    let all = await klad.getAllFromKladovka(COLLECTIONS.ITEMS);
    res.status(200).send(all);
});

app.get(urlJoin(API.ITEMS, ':id'), async function (req, res) {
    let item = await klad.getFromKladovka(COLLECTIONS.ITEMS, req.params.id);
    if (item === null)
        res.sendStatus(404);
    else
        res.status(200).send(item);
});

app.delete(API.ITEMS, async function (req, res) {
    let deleted_count = await klad.deleteAllFromKladovka(COLLECTIONS.ITEMS);
    res.status(200).send({ deleted_count });
});

app.delete(urlJoin(API.ITEMS, ':id'), async function (req, res) {
    await klad.deleteFromKladovka(COLLECTIONS.ITEMS, req.params.id);
    res.sendStatus(204);
});

app.post(API.CHARS, async function (req, res) {
    let char = req.body;
    let validationResult = validation.checkChar(char);
    if (validationResult.isValid) {
        let added_id = await klad.placeInKladovka(COLLECTIONS.CHARS, validationResult.char);
        res.header('Location', urlJoin(API.CHARS, added_id));
        res.status(201).send({ added_id });
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.put(urlJoin(API.CHARS, ':id'), async function (req, res) {
    let char = req.body;
    let validationResult = validation.checkChar(char);
    if (validationResult.isValid) {
        if (await klad.replaceInKladovka(COLLECTIONS.CHARS, req.params.id, validationResult.char))
            res.sendStatus(204);
        else
            res.sendStatus(404);
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.post(API.USERS, async function (req, res) {
    let user = req.body;
    let validationResult = await validation.checkSignUp(user);
    if (validationResult.isValid) {
        let verificationResult = await verification.checkEmail(user.email);
        if (verificationResult.isVerify) {
            let readyUser = User.readyToSave(validationResult.user);
            let added_id = await klad.placeInKladovka(COLLECTIONS.USERS, readyUser);
            res.header('Location', urlJoin(API.USERS, added_id));
            res.status(201).send({ added_id });
        } else {
            let resBody = errors.makeVerificationError(verificationResult.errors);
            res.status(400).send(resBody);
        }
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.post(API.TOKENS, async function (req, res, next) {
    let user = req.body;
    let validationResult = await validation.checkSignIn(user);
    if (validationResult.isValid) {
        passport.authenticate('local', function (err, user) {
            if (err)
                return next(err);
            else if (user === false) {
                let resBody = errors.makeAuthenticationError([{ id: "emailOrPasswordInvalid", properties: ["email", "password"] }]);
                return res.status(400).send(resBody);
            }
            else {
                let payload = {
                    _id: user._id,
                    user: user.name,
                    email: user.email
                };
                let token = jwt.sign(payload, CONFIG.JWT_SECRET);
                return res.status(200).send({ user: user.name, access_token: token });
            }
        })(req, res, next);
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.get('/api/test', function (req, res, next) {
    return passport.authenticate('jwt', { session: 'false' }, async function (err, user) {
        if (err)
            return next(err);
        else if (user === false) {
            let resBody = errors.makeAuthorizationError([{ id: "invalidToken", properties: [] }]);
            return res.status(401).send(resBody);
        }
        else if (user === null) {
            let resBody = errors.makeAuthorizationError([{ id: "notFound", properties: ["_id"] }]);
            return res.status(401).send(resBody);
        }
        else
            return res.status(200).send('ok!');
    })(req, res, next);
});

app.use(function (err, req, res, next) {
    console.log(err);
    res.sendStatus(500);
});

app.listen(CONFIG.EXPRESS_PORT, async function () {
    logger.info('Server run on port: ' + CONFIG.EXPRESS_PORT);
    await klad.connect(CONFIG.DB_URL);
});

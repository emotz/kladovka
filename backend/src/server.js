require('express-async-errors');
const logger = require('./winston.js');
const CONFIG = require('../../config/config.json');
const API = require('../../config/api.json');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const urlJoin = require('url-join');
const klad = require('../../domain/src/main');
const errors = require('../../domain/src/errors');
const validation = require('../../domain/src/validation');
let app = express();

const COLLECTIONS = {
    ITEMS: 'items',
    CHARS: 'chars',
    USERS: 'users'
};
let db;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../../frontend/dist')));

app.post(API.ITEMS, async function (req, res) {
    let item = req.body;
    let validationResult = validation.checkItem(item);
    if (validationResult.isValid) {
        let added_id = await klad.placeInKladovka(db, COLLECTIONS.ITEMS, validationResult.item);
        res.header('Location', urlJoin(API.ITEMS, added_id));
        res.status(201).send({ added_id });
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.get(API.ITEMS, async function (req, res) {
    let all = await klad.getAllFromKladovka(db, COLLECTIONS.ITEMS);
    res.status(200).send(all);
});

app.get(urlJoin(API.ITEMS, ':id'), async function (req, res) {
    let item = await klad.getFromKladovka(db, COLLECTIONS.ITEMS, req.params.id);
    if (item === null)
        res.sendStatus(404);
    else
        res.status(200).send(item);
});

app.delete(API.ITEMS, async function (req, res) {
    let deleted_count = await klad.deleteAllFromKladovka(db, COLLECTIONS.ITEMS);
    res.status(200).send({ deleted_count });
});

app.delete(urlJoin(API.ITEMS, ':id'), async function (req, res) {
    await klad.deleteFromKladovka(db, COLLECTIONS.ITEMS, req.params.id);
    res.sendStatus(204);
});

app.post(API.CHARS, async function (req, res) {
    let char = req.body;
    let validationResult = validation.checkChar(char);
    if (validationResult.isValid) {
        let added_id = await klad.placeInKladovka(db, COLLECTIONS.CHARS, validationResult.char);
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
        if (await klad.replaceInKladovka(db, COLLECTIONS.CHARS, req.params.id, validationResult.char))
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
    let validationResult = await validation.checkUserBeforeSave(user, db);
    if (validationResult.isValid) {
        let added_id = await klad.placeInKladovka(db, COLLECTIONS.USERS, validationResult.user);
        res.header('Location', urlJoin(API.USERS, added_id));
        res.status(201).send({ added_id });
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.use(function (err, req, res, next) {
    res.sendStatus(500);
});

app.listen(CONFIG.EXPRESS_PORT, async function () {
    logger.info('Server run on port: ' + CONFIG.EXPRESS_PORT);
    db = await klad.connect(CONFIG.DB_URL);
});

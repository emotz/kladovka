require('express-async-errors');
const config = require('../../config.json');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const klad = require('../../domain/src/main');
const errors = require('../../domain/src/errors');
const validation = require('../../domain/src/validation');
let app = express();

const collection = 'items';
let db;


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../../frontend/dist')));

app.post('/api/items', async function (req, res) {
    let item = req.body;
    let validationResult = validation.checkItem(item);
    if (validationResult.isValid) {
        let added_id = await klad.placeInKladovka(db, collection, validationResult.item);
        res.header('Location', '/api/items/' + added_id);
        res.status(201).send({ added_id });
    } else {
        let resBody = errors.makeValidationError(validationResult.errors);
        res.status(400).send(resBody);
    }
});

app.get('/api/items', async function (req, res) {
    let all = await klad.getAllFromKladovka(db, collection);
    res.status(200).send(all);
});

app.get('/api/items/:id', async function (req, res) {
    let item = await klad.getFromKladovka(db, collection, req.params.id);
    if (item === null)
        res.sendStatus(404);
    else
        res.status(200).send(item);

});

app.delete('/api/items/', async function (req, res) {
    let deleted_count = await klad.deleteAllFromKladovka(db, collection);
    res.status(200).send({ deleted_count });
});

app.delete('/api/items/:id', async function (req, res) {
    await klad.deleteFromKladovka(db, collection, req.params.id);
    res.sendStatus(204);
});

app.use(function (err, req, res, next) {
    res.sendStatus(500);
});

app.listen(config.express_port, async function () {
    db = await klad.connect(config.db_url);
});
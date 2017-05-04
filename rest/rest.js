const express = require('express');
const bodyParser = require('body-parser');
let klad = require('../src/main');
let app = express();

app.use(bodyParser.json());

app.post('/api/items', async function (req, res, next) {
    try {
        let added_id = await klad.placeInKladovka(req.body);
        res.header('Location', '/api/items/' + added_id);
        res.status(201).send({ added_id });
    } catch (e) {
        next(e);
    }
});

app.get('/api/items', async function (req, res, next) {
    try {
        let all = await klad.getAllFromKladovka();
        res.status(200).send(all);
    } catch (e) {
        next(e);
    }
});

app.get('/api/items/:id', async function (req, res, next) {
    try {
        let item = await klad.getFromKladovka(req.params.id);
        if (item === null) {
            res.sendStatus(404);
        } else {
            res.status(200).send(item);
        }
    } catch (e) {
        next(e);
    }
});

app.delete('/api/items/', async function (req, res, next) {
    try {
        let deleted_count = await klad.deleteAllFromKladovka();
        res.status(200).send({ deleted_count });
    } catch (e) {
        next(e);
    }
});

app.delete('/api/items/:id', async function (req, res, next) {
    try {
        await klad.deleteFromKladovka(req.params.id);
        res.sendStatus(204);
    } catch (e) {
        next(e);
    }
});

app.use(function (err, req, res, next) {
    res.sendStatus(500);
});

app.listen(8080);
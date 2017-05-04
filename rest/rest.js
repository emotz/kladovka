const express = require('express');
const bodyParser = require('body-parser');
let klad = require('../src/main');
let app = express();

app.use(bodyParser.json());

app.post('/api/items', async function (req, res) {
    let added_id = await klad.placeInKladovka(req.body);
    if (added_id instanceof Error) {
        res.sendStatus(504);
    } else {
        res.header('Location', '/api/items/' + added_id);
        res.status(201).send({ added_id });
    }
});

app.get('/api/items', async function (req, res) {
    let all = await klad.getAllFromKladovka();
    if (all instanceof Error) {
        res.sendStatus(504);
    } else {
        res.status(200).send(all);
    }
});

app.get('/api/items/:id', async function (req, res) {
    let item = await klad.getFromKladovka(req.params.id);
    if (item === null) {
        res.sendStatus(404);
    } else if (item instanceof Error) {
        res.sendStatus(504);
    } else {
        res.status(200).send(item);
    }
});

app.delete('/api/items/', async function (req, res) {
    let deleted_count = await klad.deleteAllFromKladovka();
    if (deleted_count instanceof Error) {
        res.sendStatus(504);
    } else {
        res.status(200).send({ deleted_count });
    }
});

app.delete('/api/items/:id', async function (req, res) {
    let deleted_id = await klad.deleteFromKladovka(req.params.id);
    if (deleted_id instanceof Error) {
        res.sendStatus(504);
    } else {
        res.sendStatus(204);
    }
});

app.listen(8080);
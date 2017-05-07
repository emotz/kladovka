require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
let klad = require('../src/main');
let app = express();

app.use(bodyParser.json());

app.post('/api/items', async function (req, res) {
    let added_id = await klad.placeInKladovka(req.body);
    res.header('Location', '/api/items/' + added_id);
    res.status(201).send({ added_id });

});

app.get('/api/items', async function (req, res) {
    let all = await klad.getAllFromKladovka();
    res.status(200).send(all);
});

app.get('/api/items/:id', async function (req, res) {
    let item = await klad.getFromKladovka(req.params.id);
    if (item === null) {
        res.sendStatus(404);
    } else {
        res.status(200).send(item);
    }
});

app.delete('/api/items/', async function (req, res) {
    let deleted_count = await klad.deleteAllFromKladovka();
    res.status(200).send({ deleted_count });
});

app.delete('/api/items/:id', async function (req, res) {
    await klad.deleteFromKladovka(req.params.id);
    res.sendStatus(204);
});

app.use(function (err, req, res, next) {
    res.sendStatus(500);
});

app.listen(8080);
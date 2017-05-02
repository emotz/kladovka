const express = require('express');
const bodyParser = require('body-parser');
let klad = require('../src/main');
let app = express();
app.listen(8080);

app.use(bodyParser.json());

app.get('/api/items', async function (req, res) {
    let all = await klad.getAllFromKladovka();
    res.status(200).send(all);
});

app.get('/api/items/:id', async function (req, res) {
    let item = await klad.getFromKladovka(req.params.id);
    res.status(200).send(item);
});

app.delete('/api/items/', async function (req, res) {
    let count = await klad.deleteAllFromKladovka();
    res.status(200).send('Count deleted items: ' + count);
});

app.delete('/api/items/:id', async function (req, res) {
    let id = await klad.deleteFromKladovka(req.params.id);
    res.status(200).send(`id: ${id} - deleted`);
});

app.post('/api/items', async function (req, res) {
    let id = await klad.placeInKladovka(req.body);
    res.status(201).send(`Идентификатор добавленного предмета: ${id}`);
});
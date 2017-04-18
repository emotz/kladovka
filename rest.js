const express = require('express');
const bodyParser = require('body-parser');
let klad = require('./src/main');

let app = express();
app.listen(8080);
app.use(bodyParser.json());

app.get('/api/items', function (req, res) {
    let all = klad.getAllFromKladovka();
    res.status(200).send(all);
});

app.get('/api/items/:id', function (req, res) {
    let item = klad.getFromKladovka(req.params.id);
    res.status(200).send(item);
});

app.post('/api/items', function (req, res) {
    let id = klad.placeInKladovka(req.body);
    res.status(201).send(`Идентификатор добавленного предмета: ${id}`);
});
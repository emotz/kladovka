# kladovka

Optimizer of inventory for games

## Install required modules

```bat
npm install
```

## Configuration

In root of Kladovka, you must create `config.json`, based on `config.json.example`.

```js
{
    // Kladovka - multilanguage!
    // `default_language` can be "ru" or "en"
    "default_language": "en",

    // Kladovka can use mongoDB or memory database.
    // `db` can be "mongo" or "memory"
    "db": "mongo",

    // `db_url` is the address for your database server
    "db_url": "mongodb://localhost:27017/kladovka",

    // `express_port` is the port that will listen Kladovka
    "express_port": 8080
}
```

## Build & Run

### Docker

To build image:

```bat
docker-compose build
```

### Build distributable files

```bat
npm run build
```

### Start server

```bat
npm run dev
```

After this two steps, open `http://localhost:8080` (8080 default express port in
`config.json.example`) in your browser and delight our application.

### Run all tests

```bat
npm test
```

### Run unit tests

```bat
npm run test-unit
```

### Run e2e tests

```bat
npm run test-e2e
```

### Clean distributable files

```bat
npm run clean
```

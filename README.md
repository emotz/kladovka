# kladovka

Optimizer of inventory for games

## Install required modules

```bat
npm install
```

## Configuration

In root of Kladovka, you must create `config.json`, based on `config.json.example`.

```bat
{
    // Kladovka - multilanguage!
    // `default_language` can be "ru" or "en"
    "default_language": "en",

    // Kladovka can use mongoDB or memory database.
    // `db` can be "mongo" or "memory"
    "db": "mongo",

    // `db_url` is the address, there runnig your database server
    "db_url": "mongodb://localhost:27017/kladovka",

    // `express_port` is the port that will listen Kladovka
    "express_port": 8080
}
```

## Build & Run

### Build distibutable files

```bat
npm run build
```

### Start server

```bat
npm run dev
```

After this two steps, open `http://localhost:8080` (8080 default express port in `config.json.example`) in your browser and delight our application

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

### Clean distibutable files

```bat
npm run clean
```
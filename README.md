# kladovka

Optimizer of inventory for games

## Install required modules

```bat
npm install
```

## Database

Kladovka uses MongoDB database, and to work correctly you need a running database server on address `http://localhost:27017`

## Build & Run

### Build distibutable files

```bat
npm run build
```

### Start server

```bat
npm run dev
```

After this two steps, open `http://localhost:8080` in your browser and delight our application

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
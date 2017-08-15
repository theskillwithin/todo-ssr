# todo-ssr-server
> A progressive to-do application written with [Express](https://npmjs.com/express).

* Supports multiple instances (not a singleton)
* Simple setup
* SQL migrations
* No SQL concatenation (via a query builder)
* Form validations
* Logger

Not done yet:
* test suite


## Installation

Be sure that [Node.js](http://nodejs.org) `>= 8` and [PostgreSQL](https://postgresql.org) `>= 9` are installed.

Create the database and user:
```shell
npm run createdb
```

Install all dependencies:
```shell
npm install
```


## Serving & Testing

To start the development server:
```shell
npm start
```

To run the tests:
```shell
npm test
```

To run the tests on file changes:
```shell
npm run watch
```


## Utilities

You can check to see if any dependencies have updates available with:
```shell
npm run check-updates
```

You can remove the database and its user with:
```shell
npm run dropdb
```

You can update the database after breaking changes with:
```js
npm run migrate-up
```

Advanced migrations will require using `knex` directly:
```js
npx knex
```

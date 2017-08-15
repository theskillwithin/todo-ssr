'use strict';
const bodyParser = require('body-parser');
const cors = require('cors');
const debug = require('debug');
const express = require('express');
const knex = require('knex');
const morgan = require('morgan-debug');
const routes = require('./routes');
const session = require('express-session');

const KnexSessionStore = require('connect-session-knex')(session);

const startTodoServer = config => {
  const app = express();

  const db = knex({
    client: 'pg',
    connection: {
      database: config.dbName,
      host:     config.dbHost,
      password: config.dbPassword,
      port:     config.dbPort,
      user:     config.dbUser
    }
  });

  const log = debug('todo');

  const state = { db, log };

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cors());

  app.use(morgan('todo', 'common'));

  app.use(session({
    cookie: { maxAge: 30*24*60*60*1000 },  // 30 days
    resave: false,
    saveUninitialized: false,
    secret: config.appSecret,
    store: new KnexSessionStore({
      knex: db,
      tablename: 'sessions'
    })
  }));

  app.use('/', routes(state));

  const server = app.listen(config.appPort, config.appHostname, function() {
    const {address, port} = this.address();
    log(`Server running on http://${address}:${port}/ (Press CTRL+C to quit)`);
  });

  return {app, server};
};

module.exports = startTodoServer;

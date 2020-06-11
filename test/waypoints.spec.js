'use strict';

const knex = require('knex');

const app = require('../src/app');

describe('waypoints endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconect from db', db);
});

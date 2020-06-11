'use strict';

const knex = require('knex');

const app = require('../src/app');
const { MockUser } = require('./test-helpers');

describe('users endpoints', () => {
  let db;

  const user = new MockUser();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from test db', () => db.destroy());

  describe('POST api/users/new', () => {});
});

'use strict';

const knex = require('knex');
const jwt = require('jsonwebtoken');

const app = require('../src/app');
const { mockUser, createAuth, insertMockUser } = require('./test-helpers');

describe('auth endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from test db', () => db.destroy());

  describe('POST/api/auth/login', () => {
    const user = new mockUser();
    user.id = 42;
    user.username = 'JohnDoe92';
    user.email = 'JohnDoe92@gmail.com';
    beforeEach('insert mock user', () => {
      insertMockUser(db, user);
    });
  });
});

'use strict';

const knex = require('knex');
const supertest = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../src/app');
const { MockUser, createAuth, insertMockUser } = require('./test-helpers');

describe('auth endpoints', () => {
  let db;

  before('make knex instance', () => {
    let db;

    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from test db', () => db.destroy());

  describe('POST /api/auth/login', () => {
    const johnDoe = new MockUser();
    johnDoe.id = 42;
    johnDoe.username = 'JohnDoe92';
    johnDoe.email = 'JohnDoe92@gmail.com';
    johnDoe.password = 'sumCL3v3rP@ssword';
    beforeEach('insert mock user', () => {
      insertMockUser(db, johnDoe);
    });

    context('given an existing users valid credentials', () => {
      it('responds 200: authorizes existing login credentials', () => {
        return supertest(app).post('/api/auth/login').expect(200, johnDoe);
      });
    });
    
    context('given invalid login credentials', () => {
      it('responds 400: unable to sign in', () => {
        const invalidUser = new MockUser();
        invalidUser.username = 'doesntEvenGoHere22';
        invalidUser.password = 'bigDummy92';
        return supertest(app).post('/api/auth/login').expect(400, invalidUser);
      });
    });
  });
});

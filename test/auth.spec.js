const supertest = require('supertest');

const app = require('../src/app');
const { MockUser, insertMockUser, makeKnexInstance, cleanUsers } = require('./test-helpers');

describe('auth endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from test db', () => db.destroy());

  beforeEach('cleanup', () => cleanUsers(db));

  describe('POST /api/auth/login', () => {

    beforeEach('insert mock user', () => {
      return insertMockUser(db);
    });

    context('given an existing users valid credentials', () => {
    
      const mockUser = {
        'username': 'userrrr',
        'email': 'emaillll',
        'password': 'cl3v3rP@sswerd'
      };

      it('responds 200: authorizes existing login credentials', () => {
        return supertest(app)
          .post('/api/auth/login')
          .send(mockUser)
          .expect(200);
      });
    });
    
    context('given invalid login credentials', () => {
      it('responds 400: unable to sign in', () => {
        const invalidUser = new MockUser();
        invalidUser.username = 'doesntEvenGoHere22';
        invalidUser.password = 'bigDummy92';
        invalidUser.email = 'something';
        return supertest(app)
          .post('/api/auth/login')
          .send(invalidUser)
          .expect(400, {'error': 'incorrect username and/or password'});
      });
    });
  });
});

const app = require('../src/app');
const helpers = require('./test-helpers');

describe('UsersService', () => {
  let db;

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanUsers(db));

  afterEach('cleanup', () => helpers.cleanUsers(db));

  describe('POST /api/users/new', () => {
    describe('Given a valid user', () => {
      it('responds 201, serialized user with no password', () => {
        const newUser = {
          username: 'testusername',
          email: 'something@somewhere.com',
          password: '11AAaa!!',
        };

        return supertest(app)
          .post('/api/users/new')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body.username).to.eql(newUser.username);
            expect(res.body).to.not.have.property('password');
            expect(res.headers.location).to.eql('/login');
          });
      });
    });
  });
});

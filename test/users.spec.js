const app = require('../src/app');
const helpers = require('./test-helpers')

describe('UsersService', () => {
  let db;

  // const testUsers = helpers.makeUsersArray();
  // const [testUser] = testUsers;

  before('make knex instance', () => {
    db = helpers.makeKnexInstance();
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanUsers(db));

  afterEach('cleanup', () => helpers.cleanUsers(db));

  describe(`POST /api/users/new`, () => {
  //   // beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

  //   const requiredFields = ['user_name', 'password'];

  //   requiredFields.forEach(field => {
  //     const registerAttemptBody = {
  //       user_name: 'test username',
  //       password: 'test password'
  //     }

  //     it(`responds with 400 required error when '${field}' is missing`, () => {
  //       delete registerAttemptBody[field];

  //       return supertest(app)
  //         .post('/api/users/new')
  //         .send(registerAttemptBody)
  //         .expect(400, {
  //           error: `Missing '${field}' in request body`,
  //         });
  //     });
  //   });
  //   it(`responds 400 'Password must be longer than 8 characters' when empty password`, () => {
  //     const userShortPassword = {
  //       user_name: 'test username',
  //       password: '1234567',
  //       name: 'test name',
  //     };
  //     return supertest(app)
  //       .post('/api/users/new')
  //       .send(userShortPassword)
  //       .expect(400, { error: `Password must be longer than 8 characters` });
  //   });

  //   it(`responds 400 'Password must be less than 72 characters' when long password`, () => {
  //     const userLongPassword = {
  //       user_name: 'test username',
  //       password: '*'.repeat(73),
  //     };

  //     return supertest(app)
  //       .post('/api/users/new')
  //       .send(userLongPassword)
  //       .expect(400, { error: `Password must be less than 72 characters` });
  //   });

  //   it(`responds 400 error when password starts with spaces`, () => {
  //     const userPasswordStartsSpaces = {
  //       user_name: 'test username',
  //       password: ' 1Aa!2Bb@',
  //     };

  //     return supertest(app)
  //       .post('/api/users/new')
  //       .send(userPasswordStartsSpaces)
  //       .expect(400, { error: `Password must not start or end with empty spaces` });
  //   });

  //   it(`responds 400 error when password ends with spaces`, () => {
  //     const userPasswordEndsSpaces = {
  //       user_name: 'test username',
  //       password: '1Aa!2Bb@ ',
  //     };

  //     return supertest(app)
  //       .post('/api/users/new')
  //       .send(userPasswordEndsSpaces)
  //       .expect(400, { error: `Password must not start or end with empty spaces` });
  //   });

  //   it(`responds 400 error when password isn't complex enough`, () => {
  //     const userPasswordNotComplex = {
  //       user_name: 'test username',
  //       password: 'AAaabbCC',
  //     };

  //     return supertest(app)
  //       .post('/api/users/new')
  //       .send(userPasswordNotComplex)
  //       .expect(400, { error: `Password must contain 1 upper case, lower case, and number character` });
  //   });

  //   it(`responds 400 'User name already taken' when username isn't unique`, () => {
  //     const duplicateUser = {
  //       user_name: testUser.user_name,
  //       password: '11AAaa!!',
  //     };

  //     return supertest(app)
  //       .post('/api/users/new')
  //       .send(duplicateUser)
  //       .expect(400, { error: `Username already taken` });
  //   });

    describe(`Given a valid user`, () => {
      it(`responds 201, serialized user with no password`, () => {
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
            expect(res.body.username).to.eql(newUser.username)
            expect(res.body).to.not.have.property('password')
            expect(res.headers.location).to.eql(`/login`)
          });
      });
    });
  });
});

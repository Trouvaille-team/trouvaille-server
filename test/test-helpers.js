const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('knex');

class MockUser {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

function makeKnexInstance() {
  return knex({
    client: 'pg',
    connection: process.env.TEST_DATABASE_URL,
  });
}

const createAuth = (mockUser, secret = process.env.JWT_SECRET) => {
  const token = jwt.sign({ id: mockUser.id }, secret, {
    subject: mockUser.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
};

const insertMockUser = (db) => {
  const mockUser = {
    'username': 'userrrr',
    'email': 'emaillll',
    'password': bcrypt.hashSync('cl3v3rP@sswerd', 10)
  };

  return db.into('users').insert(mockUser);
};

const insertTrip = (db) => {
  let testTrip = [{
    'origin': JSON.stringify('blah'),
    'destination': JSON.stringify('asjdf'),
    'waypoints': JSON.stringify('asdf'),
    'destination_name': JSON.stringify('asdf'),
    'user_id': 1
  }];

  return db.into('trips').insert(testTrip);
};

function cleanTrip(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        "trips"`
    )
      .then(() =>
        Promise.all([
          trx.raw('ALTER SEQUENCE trips_trip_id_seq minvalue 0 START WITH 1'),
          trx.raw('SELECT setval(\'trips_trip_id_seq\', 0)')
        ]))
  );
}

function cleanUsers(db) {
  return db.raw(
    `TRUNCATE 
      users restart identity CASCADE`
  );
}


module.exports = {
  MockUser,
  createAuth,
  insertMockUser,
  insertTrip,
  cleanTrip,
  cleanUsers,
  makeKnexInstance
};

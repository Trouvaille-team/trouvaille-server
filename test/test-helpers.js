'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class testUser {
  constructor() {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

const createAuth = (user, secret = process.env.JWT_SECRET) => {
  const token = jwt.sign({ id: user.id }, secret, {
    subject: testUser.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
};

const insertMockUser = (db, user) => {
  const mockUser = new testUser(user);
  mockUser.password = bcrypt.hashSync('cl3v3rP@sswerd', 10);
  return db.into('users').insert(mockUser);
};

module.exports = {
  testUser,
  createAuth,
  insertMockUser,
};

const config = require('../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authService = {
  getUserName(db, username) {
    return db('users').where({ username }).first();
  },
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256',
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },
};

module.exports = authService;

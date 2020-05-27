'use strict';

const bcrypt = require('bcrypt');



const usersService = {
    checkUsers(db, username) {
    return db('user')
      .where({ username })
      .first()
      .then(user => !!user);
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    const PW_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
    if(password.length < 8) {
      return 'password must be greater than 8 characters';
    }
    if(password.length > 28) {
      return 'password must be less than 28 characters';
    }
    if(password.startsWith(' ') || password.endsWith(' ')) {
      return 'password must not start or end with a blank space';
    }
    if(!PW_REGEX.test(password)) {
      return 'password must contain an uppercase, lowercase, a number, and a special character';
    }
    else {
      return bcrypt.hash(password, 12);
    }
  },
//   validateEmail(email) {
//       const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//       if(email.length <= 10) {
//           return 'password must be at least 10'
//       }
//   }
};

module.exports = usersService;
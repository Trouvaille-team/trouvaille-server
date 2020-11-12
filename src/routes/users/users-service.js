const bcrypt = require('bcrypt');
const xss = require('xss');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');

const transport = nodemailer.createTransport(
  sgTransport({
    apiKey: process.env.SENDGRID_KEY
  })
);

const usersService = {
  checkUsers(db, username) {
    return db('users')
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
    const PW_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&])[\S]+/;
    if (password.length < 8) {
      return 'password must be greater than 8 characters';
    }
    if (password.length > 28) {
      return 'password must be less than 28 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'password must not start or end with a blank space';
    }
    if (!PW_REGEX.test(password)) {
      return 'password must contain an uppercase, lowercase, a number, and a special character';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  sanitizeUser(user) {
    return {
      username: xss(user.username),
      email: xss(user.email)
    };
  },
  sendConfirmationEmail(username, email) {
    transport.sendMail({
      from: 'noreply@trouvaille.com',
      to: `${username} <${email}>`,
      subject: 'hello, brandon!',
      html: '<h2>welcome to nodemailer and sendgrid</h2>'
    });
  },
};

module.exports = usersService;
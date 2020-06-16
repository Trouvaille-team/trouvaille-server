/* eslint-disable strict */

const knex = require('knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const { MockUser } = require('../../test/test-helpers');
const email = process.env.NODEMAILER_EMAIL || 'example@gmail.com';
const password = process.env.NODEMAILER_PASSWORD || 's3cur3p@sswerd';

const smtpTransport = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE_PROVIDER || 'gmail',
  auth: {
    user: email,
    pw: password,
  },
});

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./api.templates'),
  extName: '.html',
};

smtpTransport.use('compile', hbs(handlebarsOptions));

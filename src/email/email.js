const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const email = express();
const emailRouter = express.Router();

// view email template engine setup
email.engine('handlebars', exphbs());
email.set('view engine', 'handlebars');

// setup static asset folder
email.use('/public', express.static(path.join(__dirname, 'public')));

// middleware setup
emailRouter.use(email);
emailRouter.use(bodyParser.urlencoded({ extended: false }));
emailRouter.use(bodyParser.json());

emailRouter.get('/reset', (req, res) => {
  res.render('contact');
});

module.exports = emailRouter;

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

emailRouter.post('/confirm', async (req, res, next) => {
  const { username, password, email} = req.params;
  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ACCT,
        pass: process.env.GMAIL_PW
      }
    })

    const mailOptions = {
      from: process.env.GMAIL_ACCT,
      to: email,
      subject: `Trouvaille Email Confirmation - ${username}`,
      text: 'click the link here to confirm your account with Trouvaille!'
  };

  await transporter.sendMail(mailOptions, (err, info) => {
    err ? console.error(err) : console.info(`Success - email sent to ${email}!`)
  })
}
  catch(err) {
    console.error(err)
  }
})

module.exports = emailRouter;

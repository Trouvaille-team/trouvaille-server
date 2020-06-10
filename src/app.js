/* eslint-disable strict */
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');
const errorHandler = require('./middleware/error-handler');

const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const waypointsRouter = require('./waypoints/waypointsRouter');
const tripsRouter = require('./trips/trips-router');

const app = express();
app.use(
  morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test',
  })
);
app.use(helmet());
app.use(cors());

app.use('/api/waypoints', waypointsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);

app.use(errorHandler);

module.exports = app;

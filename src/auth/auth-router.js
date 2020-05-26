/* eslint-disable strict */

const express = require('express');


const authService = require('./authService');
const { requireAuth } = require('../middleware/jwt-auth')

const authRouter = express.Router();
const jsonBodyParser = express.json();

auth
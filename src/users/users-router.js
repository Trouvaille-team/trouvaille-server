'use strict';

const express = require('express');
const path = require('path');
const usersService = require('./users-service');


const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter
  .post('/', jsonBodyParser, async (req, res, next) => {
    const { password, username, name } = req.body

    for (const field of ['username', 'email', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `${field} missing in request body`
        })

    try {
      const passwordError = UserService.validatePassword(password)

      if (passwordError)
        return res.status(400).json({ error: passwordError })

      const hasUserWithUserName = await UserService.checkUsers(
        req.app.get('db'),
        username
      )

      if (hasUserWithUserName)
        return res.status(400).json({ error: `existing user already has that username` })

      const hashedPassword = await  userService.hashPassword(password)

      const newUser = {
        username,
        password: hashedPassword,
        name,
      }

      const hasUserWithEmail = await user

      const user = await UserService.insertUser(
        req.app.get('db'),
        newUser
      )
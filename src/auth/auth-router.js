/* eslint-disable strict */

const express = require('express');


const authService = require('./authService');
const { requireAuth } = require('../middleware/jwt-auth');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.route('/token')
  .post(jsonBodyParser, async(req, res, next) => {
    const { username, password } = req.body;
    const reqUser = { username, password };

    for(const [key, value] of Object.entries(reqUser)) 
      if(value === null) {
        return res.status(400).send({
          error: `${key} missing in request body`
        });
      }
    try {
      const userInDb = await authService.getUserName(
        req.app.get('db'),
        reqUser.username
      );
      if(!userInDb) 
        return res.status(400).json({
          error: 'incorrect username and/or password'
        });

      const checkMatch = await authService.comparePassword(
        reqUser.password,
        userInDb.password
      );
      if(!checkMatch) 
        return res.status(400).json({
          error: 'incorrect username and/or password'
        });
        
      const subject = userInDb.username;
      const payload = {
        user_id: userInDb.id
      };
      res.send({
        authToken: authService.createJWT(subject, payload)
      });
    } catch(error) {
      next(error);
    }  
    
  })

  .put(requireAuth, (req, res) => {
    const subject = req.username;
    const payload = {
      user_id: req.user.id
    };
    res.send({
      authToken: authService.createJWT(subject, payload),
    });
  });


module.exports = authRouter;
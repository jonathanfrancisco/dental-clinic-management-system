const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const moment = require('moment');

module.exports.users = async (req, res) => {
   const users = await User.query().orderBy('id', 'desc');
   return res.send({users});
}

module.exports.create = async (req, res) => {

   const newUser = req.body;
   try {
      console.log('Before moment:  ', newUser.birthday);
      if(newUser.password !== newUser.confirm_password)
         return res.status(500).send({error: 'Internal server error'});
      delete newUser['confirm_password'];
      const result = await User.register(newUser);
      return res.sendStatus(200);
   } catch(err) {
      if(err.name ==='ValidationError') {
         console.log(err);
         return res.send({errors: err.data});
      }
      else {
         console.error(err);
         return res.status(500).send({error: 'Internal server error'});
      }
   }
   
}

module.exports.login = async (req, res) => {

   try {
     
      const [user] = await User.query().where('username','=', req.body.username);
      if(!user)
         return res.send({error: 'Invalid username or password'});
   
      const isPasswordCorrect = await user.isPasswordCorrect(req.body.password);
      
      if(isPasswordCorrect) {
         const payload = {
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name
         };
         const token = jwt.sign(payload, secret);
         res.cookie('token', token, {httpOnly: true}).sendStatus(200);
      }
      else 
         return res.send({error: 'Invalid username or password'});
   
   } catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error!'});
   }
   
}

module.exports.logout = (req, res) => {
   res.clearCookie('token').sendStatus(200);
}
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const bcrypt = require('bcrypt');

module.exports.users = async (req, res) => {
   const users = await User.query().orderBy('id', 'desc');
   return res.send({users});
}

module.exports.getUserById = async (req, res) => {
   const id = req.params.id;
   const user = await User.query().findById(id);
   return res.send({user});
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

module.exports.delete = async (req, res) => {

   try {
      const result = await User.query().deleteById(req.body.id);
      if(result)
         res.sendStatus(200);
   } catch(err) {
      console.error(err);
      return res.status(500).send({error: 'Internal server error'});
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
            last_name: user.last_name,
            role: user.role
         };
         const token = jwt.sign(payload, secret);
         res.cookie('token', token, {httpOnly: true}).status(200).send({user: payload});
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
   req.user = null;
}
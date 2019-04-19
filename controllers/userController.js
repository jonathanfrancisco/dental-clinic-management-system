const User = require('../models/User');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const bcrypt = require('bcrypt');

module.exports.validateUsername = async(req, res) => {
   const {username} = req.params; 
   console.log('gago');
   try {
      const users = await User.query().select('username');
      const isExist = users.find((obj) => obj.username === username);
      if(isExist)
         return res.send({isValid: false});
      return res.send({isValid: true});
   }
   catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }

}

module.exports.users = async (req, res) => {
   const users = await User.query().orderBy('id', 'desc');
   return res.send({users});
}

module.exports.getUserById = async (req, res) => {
   const id = req.params.id;
   const user = await User.query().findById(id);
   return res.send({user});
}

module.exports.register = async (req, res) => {
   const newUser = req.body;
   console.log(newUser);
   try {
      if(newUser.password !== newUser.confirm_password)
         return res.status(500).send({error: 'Internal server error'});
      delete newUser['confirm_password'];
      const [patient] = await Patient.query().select('id').where('code', newUser.patient_code);
      if(!patient)
         return res.status(500).send({error: 'Internal server error'});
      delete newUser.patient_code;
      newUser.patient_id = patient.id;
      newUser.role = 'patient';
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

module.exports.create = async (req, res) => {

   const newUser = req.body;
   try {
   
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

module.exports.update = async (req, res) => {
   console.log(req.body);
   const id = req.params.id;
   let patchUser;

   if(req.body.password && req.body.confirm_password) {
      if(req.body.password !== req.body.confirm_password)
         return res.status(500).send({error: 'Internal server error'});
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds).then(hash => hash)
      patchUser = {
         username: req.body.username,
         password: hashedPassword
      };
   }

   else if(!req.body.password && !req.body.confirm_password && req.body.username)
      patchUser = {
         username: req.body.username
      };
   else if(req.body.role === 'patient') 
      patchUser = {
         name: req.body.name,
         address: req.body.address,
         birthday: req.body.birthday,
         emailaddress: req.body.emailaddress
      };
   else {
      patchUser = {
         name: req.body.name,
         address: req.body.address,
         birthday: req.body.birthday,
         role: req.body.role
      };
   }

   try {
      const result = await User.query().patchAndFetchById(id, patchUser);
      return res.sendStatus(200);
   } catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }

}

module.exports.delete = async (req, res) => {
   try {
      const result = await User.query().deleteById(req.params.id);
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
            id: user.id,
            username: user.username,
            name: user.name,
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
   req.user = null;
   res.clearCookie('token').sendStatus(200);
}
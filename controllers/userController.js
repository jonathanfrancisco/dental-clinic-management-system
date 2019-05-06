const User = require('../models/User');
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

module.exports.validateUsername = async(req, res) => {
   const {username} = req.params; 
   try {
      const users = await User.query().select('username');
      const isExist = users.find((obj) => obj.username === username);
      if(isExist)
         return res.send({isValid: false, username});
      return res.send({isValid: true, username});
   }
   catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}


module.exports.validateEmail = async(req, res) => {
   const {email} = req.params; 
   try {
      const users = await User.query().select('emailaddress');
      const isExist = users.find((obj) => obj.emailaddress === email);
      if(isExist)
         return res.send({isValid: false, email});
      return res.send({isValid: true, email});
   }
   catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.users = async (req, res) => {

   const {search} = req.query;

   let users;
   if(!search)
      users = await User.query().orderBy('id', 'desc');
   else {
      users = await User.query().whereRaw(`LOWER(name) like "%${search.toLowerCase()}%" OR LOWER(username) like "%${search.toLowerCase()}%"`).orderBy('id', 'desc');
   }
   return res.send({users});
}

module.exports.admins = async (req, res) => {
   const users = await User.query().whereIn('role', ['dentist', 'dentalaide']);
   console.log(users);
   return res.send({users});
}

module.exports.getUserById = async (req, res) => {
   const id = req.params.id;
   const user = await User.query().findById(id);
   return res.send({user});
}

module.exports.register = async (req, res) => {
   const newUser = req.body;
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
   else {
      patchUser = {
         name: req.body.name,
         address: req.body.address,
         birthday: req.body.birthday,
         role: req.body.role,
         emailaddress: req.body.role === 'dentalaide' ? '' : req.body.emailaddress
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
            role: user.role,
            patient_id: user.patient_id
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


module.exports.resetPassword = async (req, res) => {
   const {token} = req.params;
   try {
      const decodeWithoutVerify = jwt.decode(token);
      const [user] = await User.query().select('password').where('emailaddress', decodeWithoutVerify.emailaddress);

      jwt.verify(token, user.password, async (err, decoded) => {

         if(err) {
            console.log(err);
            return res.status(500).send({error: 'Internal server error'});        
         }

         else if(decoded) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(decoded.newPassword, saltRounds).then(hash => hash);
            await User.query().patch({password: hashedPassword}).where('emailaddress', decoded.emailaddress);
            return res.sendStatus(200); 
         }

      })
   } catch(err) {
      console.log(err);
      res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.forgotPassword = async (req, res) => {
 
   const {emailaddress, password, confirm_password} = req.body;


   try {
      const [user] = await User.query().select('id','password').where('emailaddress', emailaddress);
      if(!user)
         return  res.status(500).send({error: 'Internal server error!'});

      const payload = {
         id: user.id,
         emailaddress,
         newPassword: password
      }
      
      const token = jwt.sign(payload, user.password);

      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_EMAIL, // REAL GMAIL EMAIL
          pass: process.env.GMAIL_PASSWORD // REAL GMAIL PASSWORD
        }
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        to: `<${emailaddress}>`, // list of receivers
        from: `Andres Dental Clinic <${process.env.GMAIL_EMAIL}>`,
        subject: "Reset Password Link", // Subject line
        html: `
         <h1>Hello!</h1>
         <p>You are receiving this email because we received a password reset request for your account.</p>
         <p>If you did not request a password reset, no further action is required.</p>
         <a href="http://localhost:3000/resetPassword/${token}">Click here to reset your password</a>
         <br />
         <p>Regards,</p>
         <p>Andres Dental Clinic</p>
        ` // html body
     
      });

      console.log("Email sent: %s", info.messageId);
      return res.sendStatus(200);

   } catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error!'});
   }

}
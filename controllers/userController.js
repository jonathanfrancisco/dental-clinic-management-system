const User = require('../models/User');
const moment = require('moment');

module.exports.create = async (req, res) => {
   
   const newUser = req.body;

   try {
      const result = await User.register(newUser);
      res.send({
         result
      });
   } catch(err) {
      if(err.name ==='ValidationError')
         return res.send({errors: err.data});
      else {
         console.error(err);
         return res.status(500).send('Internal server error');
      }
   }
   
}
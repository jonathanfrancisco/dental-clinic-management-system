const User = require('../models/User');


module.exports.test = async (req, res) => {
   res.send({
      message: 'Hello World!!!'
   });
}
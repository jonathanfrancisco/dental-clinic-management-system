const jwt = require('jsonwebtoken');
const secret = require('../config').secret;


const withAuth = (req, res, next) => {
   const token =
   req.body.token ||
   req.query.token ||
   req.headers['x-access-token'] ||
   req.cookies.token;

   if(!token) {
      return res.status(401).send('Unauthorized: No token provided');
   }
   else {
      jwt.verify(token, secret, (err, decoded) => {
         if(err) {
            return res.status(401).send('Unauthorized: Invalid token');
         }
         next();
      });
   }

}

module.exports = withAuth;
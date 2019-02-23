const Model = require('./Model');

class User extends Model {
   static get tableName() {
      return 'user';
   }
}

module.exports = User;
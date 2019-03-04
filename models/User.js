const Model = require('./Model');
const {ValidationError} = Model;
const bcrypt = require('bcrypt');

class User extends Model {
   static get tableName() {
      return 'user';
   }
   static get jsonSchema() {
      return {
         type: 'object',
         required: ['username','password','name', 'birthday','address','role'],
         properties: {
            id: {type: 'integer'},
            username: {type: 'string'},
            password: {type: 'string'},
            name: {type: 'string'},
            birthday: {type: 'date-time'},
            address: {type: 'string'},
            role: {type: 'string'}
         }
      };
   }

   static get relationMappings() {
      const Treatment = require('./Treatment');
      return {
         treatments: {
            relation: Model.HasManyRelation,
            modelClass: Treatment,
            join: {
               from: 'user.id',
               to: 'treatment.user_id'
            }
         }
      };
   }

   static async register(newUser) {

      const saltRounds = 10;
      const plainPassword = newUser.password;
      
      if(!plainPassword || plainPassword === '')
         throw new ValidationError(
         {
            type: 'ModelValidation',
            data: {
               password: [
                  {
                     message: 'is a required property',
                     keyword: 'required',
                     params: {
                        missingProperty: "password"
                     }
                  }
               ]
            }
         });
         
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds).then(hash => hash)
      newUser.password = hashedPassword;
      return await this.query().insert(newUser);

   }

   async isPasswordCorrect(password) {
     return await bcrypt.compare(password, this.password).then((res) => res);
   }

}

module.exports = User;
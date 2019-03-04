const Model = require('./Model');


class Patient extends Model {
   static get tableName() {
      return 'patient';
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['code','name','address','birthday','last_visit'],
         properties: {
            id: {type: 'integer'},
            code: {type: 'string'},
            name: {type: 'string'},
            address: {type: 'string'},
            birthday: {type: 'date-time'},
            occupation: {type: 'string'},
            civil_status: {type: 'string'},
            contact_number: {type: 'string'},
            last_visit: {type: 'date-time'},
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
               from: 'patient.id',
               to: 'treatment.patient_id'
            }
         }
      };
   }

}

module.exports = Patient;
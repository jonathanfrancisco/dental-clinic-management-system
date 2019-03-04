const Model = require('./Model');

class Treatment extends Model {

   static get tableName() {
      return 'treatment';
   }

   static get relationMappings() {
      const Patient = require('./Patient');
      const User = require('./User');
      return {
         patient: {
            relation: Model.HasOneRelation,
            modelClass: Patient,
            join: {
               from: 'treatment.patient_id',
               to: 'patient.id'
            }
         },
         user: {
            relation: Model.HasOneRelation,
            modelClass: User,
            join: {
               from: 'treatment.user_id',
               to: 'user.id'
            }
         }
      };
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['status', 'description', 'payment_type', 'patient_id','user_id'],
         properties: {
            status: {type: 'string'},
            description: {type: 'string'},
            tooth_affected_no: {type: 'string'},
            total_amount_to_pay: {type: 'integer'},
            payment_type: {type: 'string'},
            date_treated: {type: 'date-time'},
            patient_id: {type: 'integer'},
            user_id: {type: 'integer'}
         }
      };
   }

}

module.exports = Model;
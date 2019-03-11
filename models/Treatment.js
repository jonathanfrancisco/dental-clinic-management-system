const Model = require('./Model');

class Treatment extends Model {

   static get tableName() {
      return 'treatment';
   }

   static get relationMappings() {
      const PaymentTransaction = require('./PaymentTransaction');
      const Patient = require('./Patient');
      const User = require('./User');
      return {
         payments: {
            relation: Model.HasManyRelation,
            modelClass: PaymentTransaction,
            join: {
               from: 'treatment.id',
               join: 'payment_transaction.treatment_id'
            }
         },
         patient: {
            relation: Model.BelongsToOneRelation,
            modelClass: Patient,
            join: {
               from: 'treatment.patient_id',
               to: 'patient.id'
            }
         },
         user: {
            relation: Model.BelongsToOneRelation,
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
         required: ['description', 'payment_type', 'patient_id','user_id'],
         properties: {
            id: {type: 'integer'},
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

module.exports = Treatment;
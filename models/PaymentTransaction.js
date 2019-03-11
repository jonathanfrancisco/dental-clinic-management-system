const Model = require('./Model');


class PaymentTransaction extends Model {

   static get tableName() {
      return 'payment_transaction';
   }

   static get relationMappings() {
      const Treatment = require('./PaymentTransaction');
      const User = require('./User');
      return {
         treatment: {
            relation: Model.BelongsToOneRelation,
            modelClass: Treatment,
            join: {
               from: 'payment.treatment_id',
               join: 'treatment.id'
            }
         },
         received_by: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
               from: 'payment.user_id',
               join: 'user.id'
            }
         }
      };
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['amount_paid', 'date_paid', 'treatment_id', 'user_id'],
         properties: {
            id: {type: 'integer'},
            amount_paid: {type: 'integer'},
            date_paid: {type: 'date-time'},
            current_balance_before: {type: 'integer'},
            new_balance_after: {type: 'integer'},
            treatment_id: {type: 'integer'},
            user_id: {type: 'integer'}
         }
      };
   }

}

module.exports = PaymentTransaction;
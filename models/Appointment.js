const Model = require('./Model');


class Appointment extends Model {
   static get tableName() {
      return 'patient';
   }

   static get jsonSchema() {
      return {
         type: 'object',
         required: ['date_time', 'patient_id', 'reason', 'status'],
         properties: {
            id: {type: 'integer'},
            date_time: {type: 'date-time'},
            patient_id: {type: 'integer'},
            reason: {type: 'string'},
            status: {type: 'string'},
            contact_number: {type: 'string'}
         }
      };
   }

   static get relationMappings() {
      
      const Patient = require('./Patient');

      return {
         patient: {
            relation: Model.BelongsToOneRelation,
            modelClass: Patient,
            join: {
               from: 'appointment.patient.id',
               to: 'patient.id'
            }
         }
      };
   }

}

module.exports = Appointment;
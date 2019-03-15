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
      const AdultTeethChart = require('./AdultTeethChart');
      const ChildTeethChart = require('./ChildTeethChart');
      const Appointment = require('./Appointment');

      return {
         adult_teeth_chart: {
            relation: Model.HasOneRelation,
            modelClass: AdultTeethChart,
            join: {
               from: 'patient.id',
               to: 'patient_adult_teeth_chart.patient_id'
            }
         },
         child_teeth_chart: {
            relation: Model.HasOneRelation,
            modelClass: ChildTeethChart,
            join: {
               from: 'patient.id',
               to: 'patient_child_teeth_chart.patient_id'
            }
         },
         treatments: {
            relation: Model.HasManyRelation,
            modelClass: Treatment,
            join: {
               from: 'patient.id',
               to: 'treatment.patient_id'
            }
         },
         appointments: {
            relation: Model.HasManyRelation,
            modelClass: Appointment,
            join: {
               from: 'patient.id',
               to: 'appointment.patient_id'
            }
         }
      };
   }

}

module.exports = Patient;
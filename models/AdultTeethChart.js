const Model = require('./Model');


class AdultTeethChart extends Model {
   static get tableName() {
      return 'patient_adult_teeth_chart';
   }

   static get relationMappings() {
   
      const Patient = require('./Patient');
      
      return {
         patient: {
            relation: Model.HasOneRelation,
            modelClass: Patient,
            join: {
               from: 'patient_adult_teeth_chart.patient_id',
               to: 'patient.id'
            }
         }
      };
   }

}

module.exports = AdultTeethChart;
const Patient = require('../models/Patient');
const {raw} = require('objection');


module.exports.getRecipients = async (req, res) => {

   const {search} = req.query;
   let recipients;
   try {
      
      if(!search) {
         recipients = await Patient.query()
                  .select('patient.id',
                          'patient.name', 
                          'patient.contact_number',
                          raw('(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit'),
                          raw('(SELECT SUM((SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id GROUP BY treatment.id)) as total FROM treatment WHERE treatment.patient_id = patient.id)   as total_balance'),
                          raw('(SELECT date_time FROM appointment WHERE appointment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_time) DESC LIMIT 1) as next_appointment')
                        )
      }
      
      else {
         recipients = await Patient.query()
         .select('patient.name', 
                 'patient.contact_number',
                 raw('(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit'),
                 raw('(SELECT SUM((SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id GROUP BY treatment.id)) as total FROM treatment WHERE treatment.patient_id = patient.id)   as total_balance'),
                 raw('(SELECT date_time FROM appointment WHERE appointment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_time) DESC LIMIT 1) as next_appointment')
         )
         .whereRaw(`LOWER(patient.name) like "%${search.toLowerCase()}%"`)
      }

      return res.send({recipients});

   } catch(err) {
      console.log(err);
      return res.status(500).send({message: 'Internal server error'});
   }
}
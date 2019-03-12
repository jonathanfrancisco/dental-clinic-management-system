const Treatment = require('../models/Treatment');
const PaymentTransaction = require('../models/PaymentTransaction');
const {raw} = require('objection');


module.exports.getTreatmentsById = async (req, res) => {
   const {id} = req.params;
   try {
      const treatments = await Treatment.query().select('treatment.*', 'user.name as treated_by',
       raw(`(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id) as balance`))
                        .join('user', 'treatment.user_id', 'user.id')
                        .where('patient_id', id).orderBy('date_treated','desc').orderBy('id', 'desc');
      res.status(200).send({treatments});
   } catch(err) {
      console.log(err);
   }

}

module.exports.add = async (req, res) => {
   const newTreatment = req.body;
   const {id: patient_id} = req.params;
   newTreatment.patient_id = parseInt(patient_id);
   try {

      if(newTreatment.payment_type === 'no-charge') {
         const treatment = await Treatment.query().insert(newTreatment);
         return res.sendStatus(200);
      }

      else if(newTreatment.payment_type === 'in-full' || newTreatment.payment_type === 'installment') {
         if(newTreatment.payment_type === 'in-full') {
            const treatment = await Treatment.query().insertAndFetch(newTreatment);
            const payment = await PaymentTransaction.query().insert({
               amount_paid: treatment.total_amount_to_pay,
               treatment_id: treatment.id,
               user_id: req.user.id,
               date_paid: treatment.date_treated
            });
         }
         else {
            const amount_paid = newTreatment.amount_paid;
            delete newTreatment.amount_paid;
            const treatment = await Treatment.query().insertAndFetch(newTreatment);
            const current_balance_before = treatment.total_amount_to_pay;
            const new_balance_after = treatment.total_amount_to_pay -  amount_paid;

            const payment = await PaymentTransaction.query().insert({
               amount_paid,
               date_paid: treatment.date_treated,
               current_balance_before,
               new_balance_after,
               treatment_id: treatment.id,
               user_id: req.user.id
            });
            
         }
         return res.sendStatus(200);
      }

   } catch(err) {
      console.log(err);
      return res.status(500).send({message: 'Internal server error!'});
   }


}
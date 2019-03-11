const Treatment = require('../models/Treatment');
const PaymentTransaction = require('../models/PaymentTransaction');
const {raw} = require('objection');


module.exports.getTreatmentsById = async (req, res) => {
   const {id} = req.params;
   try {
      const treatments = await Treatment.query().select('treatment.*', 'user.name as treated_by',
       raw(`(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id) as balance`))
                        .join('user', 'treatment.user_id', 'user.id')
                        .where('patient_id', id).orderBy('date_treated','desc');
      res.status(200).send({treatments});
   } catch(err) {
      console.log(err);
   }

}
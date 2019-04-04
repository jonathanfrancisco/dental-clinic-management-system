const PaymentTransaction = require('../models/PaymentTransaction');
const {raw} = require('objection');
const moment = require('moment');

module.exports.payments = async (req, res) => {


   try {
     
      let paymentTransactions;
      
      if(req.query.startDate && req.query.endDate) {

         if(req.query.search) {
            paymentTransactions = await PaymentTransaction.query().select('payment_transaction.id','payment_transaction.amount_paid','payment_transaction.date_paid','treatment.payment_type as payment_type', 'user.name as received_by', 'patient.name as from')
            .join('user', 'user.id','payment_transaction.user_id').join('treatment','treatment.id', 'payment_transaction.treatment_id')
            .join('patient', 'patient.id', 'treatment.patient_id')
            .whereRaw(`LOWER(patient.name) like "%${req.query.search.toLowerCase()}%"`)
            .whereBetween('date_paid', [req.query.startDate+' 00:00:00', req.query.endDate+' 23:59:59'])
            .orderBy('payment_transaction.date_paid','desc')
            .orderBy('payment_transaction.id', 'desc')
            .orderBy(raw('UNIX_TIMESTAMP(date_paid)'),'ASC');
         }

         else {
            paymentTransactions = await PaymentTransaction.query().select('payment_transaction.id','payment_transaction.amount_paid','payment_transaction.date_paid','treatment.payment_type as payment_type', 'user.name as received_by', 'patient.name as from')
            .join('user', 'user.id','payment_transaction.user_id').join('treatment','treatment.id', 'payment_transaction.treatment_id')
            .join('patient', 'patient.id', 'treatment.patient_id')
            .whereBetween('date_paid', [req.query.startDate+' 00:00:00', req.query.endDate+' 23:59:59'])
            .orderBy('payment_transaction.date_paid','desc')
            .orderBy('payment_transaction.id', 'desc')
            .orderBy(raw('UNIX_TIMESTAMP(date_paid)'),'ASC');
            
         }
      
   
      }

      else {
         if(req.query.search) {
            paymentTransactions = await PaymentTransaction.query().select('payment_transaction.id','payment_transaction.amount_paid','payment_transaction.date_paid','treatment.payment_type as payment_type', 'user.name as received_by', 'patient.name as from')
            .join('user', 'user.id','payment_transaction.user_id').join('treatment','treatment.id', 'payment_transaction.treatment_id')
            .join('patient', 'patient.id', 'treatment.patient_id')
            .whereRaw(`LOWER(patient.name) like "%${req.query.search.toLowerCase()}%"`)
            .orderBy('payment_transaction.date_paid','desc')
            .orderBy('payment_transaction.id', 'desc')
            .orderBy(raw('UNIX_TIMESTAMP(date_paid)'),'ASC');

         }
         else {
            paymentTransactions = await PaymentTransaction.query().select('payment_transaction.id','payment_transaction.amount_paid','payment_transaction.date_paid','treatment.payment_type as payment_type', 'user.name as received_by', 'patient.name as from')
            .join('user', 'user.id','payment_transaction.user_id').join('treatment','treatment.id', 'payment_transaction.treatment_id')
            .join('patient', 'patient.id', 'treatment.patient_id')
            .orderBy('payment_transaction.date_paid','desc')
            .orderBy('payment_transaction.id', 'desc')
            .orderBy(raw('UNIX_TIMESTAMP(date_paid)'),'ASC');
         }
      }
      
      return res.send({paymentTransactions});
   } catch(err) {
      console.log(err);
      return res.status(500).send({message: 'Internal server error'});
   }




}

module.exports.getPaymentTransactionsById = async (req, res) => {
   const {id} = req.params;
   try {
      const paymentTransactions = await PaymentTransaction.query().select('payment_transaction.*', 'user.name as received_by')
                                 .join('user', 'payment_transaction.user_id', 'user.id').where('treatment_id', id)
                                 .orderBy('date_paid','desc').orderBy('payment_transaction.id', 'desc');
      return res.status(200).send({paymentTransactions});
   } catch(err) {
      console.log(err);
      return res.status(500).send({message: 'Internal server error'});
   }
}

module.exports.addPaymentInstallment = async (req, res) => {

   const {id} = req.params;
  
   const newPaymentTransaction = req.body;
   newPaymentTransaction.date_paid = moment(Date.now()).format('YYYY-MM-DD');
   newPaymentTransaction.new_balance_after = newPaymentTransaction.current_balance_before - newPaymentTransaction.amount_paid;
   newPaymentTransaction.treatment_id = parseInt(id);
   newPaymentTransaction.user_id = req.user.id;
   try {
      const paymentTransaction = await PaymentTransaction.query().insert(newPaymentTransaction);
      return res.sendStatus(200);
   } catch(err) {
      console.log(err);
      return res.status(500).send({message: 'Internal server error'});
   }

}
const PaymentTransaction = require('../models/PaymentTransaction');

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
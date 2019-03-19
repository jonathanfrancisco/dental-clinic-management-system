const PaymentTransaction = require('../models/PaymentTransaction');
const Treatment = require('../models/Treatment');
const moment = require('moment');
const {raw, Model} = require('objection');

module.exports.incomereceivable = async (req, res) => {

   const startOfDay = moment().startOf('day').format('YYYY-MM-DD')+' 00:00:00';
   const endOfDay = moment().endOf('day').format('YYYY-MM-DD')+' 23:59:59';

   try {
      // TODAY TOTAL GROSS INCOME
      const [todayTotalGrossIncomeResult] = await PaymentTransaction.query().select(raw('SUM(amount_paid) as totalIncome'))
      .whereBetween('date_paid', [startOfDay, endOfDay]);

      // TODAY TOTAL RECEIVABLE
      const treatments = await Treatment
                        .query()
                        .select(raw(`(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id AND payment_transaction.date_paid BETWEEN '${startOfDay}' AND '${endOfDay}') as total_receivable`))
                        .whereBetween('treatment.date_treated', [startOfDay, endOfDay]);
      let todayTotalReceivable = 0;
      treatments.forEach((treatment) => {
         todayTotalReceivable += parseInt(treatment.total_receivable);
      });

       // ALL TOTAL GROSS INCOME
       const [allTotalGrossIncome] = await PaymentTransaction.query().select(raw('SUM(amount_paid) as totalIncome'));

      // ALL TOTAL RECEIVABLE
      const allTreatments = await Treatment
                        .query()
                        .select(raw(`(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id) as total_receivable`))
      let allTotalReceivable = 0;
      allTreatments.forEach((treatment) => {
            allTotalReceivable += parseInt(treatment.total_receivable);
      });


      return res.send(
         {
            today_total_gross_income: parseInt(todayTotalGrossIncomeResult.totalIncome),
            today_total_receivable: todayTotalReceivable,
            all_total_gross_income: parseInt(allTotalGrossIncome.totalIncome),
            all_total_receivable: allTotalReceivable
         }
      );
   } catch(err) {
      console.log(err);
   }
}


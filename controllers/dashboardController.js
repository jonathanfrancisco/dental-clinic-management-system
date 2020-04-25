const PaymentTransaction = require('../models/PaymentTransaction');
const Treatment = require('../models/Treatment');
const moment = require('moment');
const { raw, Model } = require('objection');

module.exports.incomereceivable = async (req, res) => {
  const startOfDay = moment().startOf('day').format('YYYY-MM-DD') + ' 00:00:00';
  const endOfDay = moment().endOf('day').format('YYYY-MM-DD') + ' 23:59:59';

  try {
    // TODAY TOTAL GROSS INCOME
    const [
      todayTotalGrossIncomeResult,
    ] = await PaymentTransaction.query()
      .select(raw('SUM(amount_paid) as totalIncome'))
      .whereBetween('date_paid', [startOfDay, endOfDay]);

    // TODAY TOTAL RECEIVABLE
    const treatments = await Treatment.query()
      .select(
        raw(
          `(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id AND payment_transaction.date_paid BETWEEN '${startOfDay}' AND '${endOfDay}') as total_receivable`
        )
      )
      .whereBetween('treatment.date_treated', [startOfDay, endOfDay])
      .where('treatment.payment_type', 'installment');
    let todayTotalReceivable = 0;
    treatments.forEach((treatment) => {
      todayTotalReceivable += parseInt(treatment.total_receivable);
    });

    // ALL TOTAL GROSS INCOME
    const [allTotalGrossIncome] = await PaymentTransaction.query().select(
      raw('SUM(amount_paid) as totalIncome')
    );

    // ALL TOTAL RECEIVABLE
    const allTreatments = await Treatment.query()
      .select(
        'treatment.id',
        raw(
          `(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id) as total_receivable`
        )
      )
      .where('treatment.payment_type', 'installment');
    let allTotalReceivable = 0;
    allTreatments.forEach((treatment) => {
      allTotalReceivable += parseInt(treatment.total_receivable) || 0;
    });

    return res.send({
      today_total_gross_income:
        parseInt(todayTotalGrossIncomeResult.totalIncome) || 0,
      today_total_receivable: todayTotalReceivable,
      all_total_gross_income: parseInt(allTotalGrossIncome.totalIncome) || 0,
      all_total_receivable: allTotalReceivable,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.visits = async (req, res) => {
  try {
    let visits;
    let visitsRanked;
    if (req.query.filterBy === 'month') {
      visits = await Treatment.query()
        .select(
          raw(`MONTH(date_treated) as name, COUNT(id) AS 'Number of Visits'`)
        )
        .whereBetween('date_treated', [
          req.query.startDate + ' 00:00:00',
          req.query.endDate + ' 23:59:59',
        ])
        .groupByRaw('MONTH(date_treated)');
      visitsRanked = await Treatment.query()
        .select(raw(`MONTH(date_treated) as name, COUNT(id) AS totalVisits`))
        .groupByRaw('MONTH(date_treated)')
        .orderBy('totalVisits', 'DESC');
    } else {
      visits = await Treatment.query()
        .select(
          raw(`WEEKDAY(date_treated) as name, COUNT(id) AS 'Number of Visits'`)
        )
        .whereBetween('date_treated', [
          req.query.startDate + ' 00:00:00',
          req.query.endDate + ' 23:59:59',
        ])
        .groupByRaw('WEEKDAY(date_treated)');
      visitsRanked = await Treatment.query()
        .select(raw(`WEEKDAY(date_treated) as name, COUNT(id) AS totalVisits`))
        .groupByRaw('WEEKDAY(date_treated)')
        .orderBy('totalVisits', 'DESC');
    }

    return res.send({ visits, visitsRanked });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

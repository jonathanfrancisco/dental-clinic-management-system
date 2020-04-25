const Treatment = require('../models/Treatment');
const PaymentTransaction = require('../models/PaymentTransaction');
const Patient = require('../models/Patient');
const { raw } = require('objection');
const moment = require('moment');

module.exports.getTreatmentsById = async (req, res) => {
  const { balance } = req.query;
  const { id } = req.params;
  try {
    const treatments = await Treatment.query()
      .select(
        'treatment.*',
        'user.name as treated_by',
        raw(
          `(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id) as balance`
        ),
        raw(
          `(SELECT COUNT(*) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id) as transaction_count`
        )
      )
      .join('user', 'treatment.user_id', 'user.id')
      .where('treatment.patient_id', id)
      .orderBy('date_treated', 'desc')
      .orderBy('id', 'desc');
    if (balance) {
      const filteredTreatments = treatments.filter(
        (treatment) => treatment.balance > 0
      );
      return res.status(200).send({ treatments: filteredTreatments });
    }
    res.status(200).send({ treatments });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getTreatmentsByToothPosition = async (req, res) => {
  const { toothPosition, patientId } = req.params;
  try {
    const treatments = await Treatment.query()
      .where('tooth_affected_no', toothPosition)
      .where('treatment.patient_id', patientId)
      .orderBy('date_treated', 'DESC');
    res.status(200).send({ treatments });
  } catch (err) {
    console.log(err);
  }
};

module.exports.add = async (req, res) => {
  const newTreatment = req.body;
  const { id: patient_id } = req.params;
  newTreatment.patient_id = parseInt(patient_id);
  newTreatment.date_treated = moment(Date.now()).format('YYYY-MM-DD');
  try {
    if (newTreatment.payment_type === 'no-charge') {
      const treatment = await Treatment.query().insert(newTreatment);
      return res.sendStatus(200);
    } else if (
      newTreatment.payment_type === 'in-full' ||
      newTreatment.payment_type === 'installment'
    ) {
      if (newTreatment.payment_type === 'in-full') {
        const treatment = await Treatment.query().insertAndFetch(newTreatment);
        const payment = await PaymentTransaction.query().insert({
          amount_paid: treatment.total_amount_to_pay,
          treatment_id: treatment.id,
          user_id: req.user.id,
          date_paid: treatment.date_treated,
        });
      } else {
        const amount_paid = newTreatment.amount_paid;
        delete newTreatment.amount_paid;
        const treatment = await Treatment.query().insertAndFetch(newTreatment);
        const current_balance_before = treatment.total_amount_to_pay;
        const new_balance_after = treatment.total_amount_to_pay - amount_paid;

        const payment = await PaymentTransaction.query().insert({
          amount_paid,
          date_paid: treatment.date_treated,
          current_balance_before,
          new_balance_after,
          treatment_id: treatment.id,
          user_id: req.user.id,
        });
      }
      return res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error!' });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    // delete PAYMENT TRANSACTION related to this treatment first.
    const deletePaymentTransaction = await PaymentTransaction.query()
      .delete()
      .where('treatment_id', id);
    const deleteTreatment = await Treatment.query().deleteById(id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err); // delete PAYMENT TRANSACTION related to this treatment first.server error!'});
    return res.status(500).send({ message: 'Internal server error!' });
  }
};

module.exports.voidLastPaymentTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Treatment ID: ', id);
    const [lastTransaction] = await PaymentTransaction.query()
      .where('treatment_id', id)
      .orderBy('date_paid', 'DESC')
      .orderBy('id', 'DESC')
      .limit(1);
    const deleteLastTransaction = await PaymentTransaction.query()
      .delete()
      .where('id', lastTransaction.id);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error!' });
  }
};

const Patient = require('../models/Patient');
const Treatment = require('../models/Treatment');
const AdultTeethChart  =  require('../models/AdultTeethChart');
const ChildTeethChart  =  require('../models/ChildTeethChart');
const moment = require('moment');
const generate = require('nanoid/generate');
const {raw} = require('objection');


module.exports.getMyBalances = async (req, res) => {
   const {id} = req.params;
   try {
      const balances = await Treatment.query().select('treatment.description','treatment.date_treated',
       raw(`(SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id) as balance`))
                        .where({
                           patient_id: id,
                           payment_type: 'installment'
                        })
                        .having('balance','>',0)
                        .orderBy('date_treated','desc').orderBy('id', 'desc');
      console.log(balances);
      return res.status(200).send({balances});
   } catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error!'});
   }
}


module.exports.validatePatientCode = async (req, res) => {

   const {code} = req.params; 
   try {
      const patients = await Patient.query().select('code');
      const isExist = patients.find((obj) => obj.code === code);
      if(!isExist)
         return res.send({isValid: false});
      return res.send({isValid: true});
   }
   catch(err) {
      return res.status(500).send({error: 'Internal server error'});
   }



   return res.sendStatus(200);
}

module.exports.getPatientById = async (req, res) => {
   const {patientId} = req.params;
   try {
      const [patient] = await Patient.query()
                        .select('patient.*',
                        raw(`(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit`))
                        .where('patient.id', patientId);
      return res.send({patient});
   } catch(err) {
      return res.status(500).send({error: 'Internal server error'});
   }
}
module.exports.patients = async (req, res) => {
   let {search} = req.query;
   if(!search) 
      patients = patients = await Patient
                           .query()
                           .select('patient.name',
                           raw(`(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit`),
                           'patient.address',
                           'patient.code',
                           'patient.id')
                           .orderBy('patient.id', 'desc');
   else 
      patients = await Patient
                  .query()
                  .select('patient.name',
                  raw(`(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit`),
                  'patient.address',
                  'patient.code',
                  'patient.id')
                  .whereRaw(`LOWER(name) like "%${search.toLowerCase()}%"`)
                  .orderBy('patient.id', 'desc');;
   return res.send({patients});
}

module.exports.getPatientByCode = async (req, res) => {
   const {code} = req.params;
   try {
      const [patient] = await Patient.query()
                        .select('patient.*',
                        raw(`(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit`))
                        .where('code', code);
      return res.send({patient});
   } catch(err) {
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.create = async (req, res) => {
   try {
      
      const newPatient = req.body;
      const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let newPatientCode, isUnique;
      const patients = await Patient.query();

      do {
         newPatientCode = generate(alphabet, 8);
         isUnique = true;
         patients.forEach((patient) => {
            if(newPatientCode === patient.code) 
               isUnique = false;
         });
       
      } while(!isUnique);

      newPatient.code = newPatientCode;
     
      const patient = await Patient.query().insertAndFetch(newPatient);
      if(!patient)
         return res.status(500).send({error: 'Internal server error'});
      const adultTeethChart = await AdultTeethChart.query().insert({id: patient.id});
      const childTeethChart = await ChildTeethChart.query().insert({id: patient.id});
      if(!adultTeethChart || !childTeethChart)
         return res.status(500).send({error: 'Internal server error'});
      return res.sendStatus(200);
   } catch(err) {
      console.error(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.update = async (req, res) => {
   const code = req.params.code;
   const newInfo = req.body;
   try {
      const result = await Patient.query().patch(newInfo).where('code', code);
      return res.sendStatus(200);
   } catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.childTeethChart = async (req, res) => {
   const {id} = req.params;
   try {
      const [childTeethChart] = await ChildTeethChart.query().where('id', id);
      return res.send({child_teeth_chart: childTeethChart});
   } catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.updateChildTeethChart = async (req, res) => {
   const {id} = req.params;
   const newChart = req.body;
   try {
      const result = await ChildTeethChart.query().patch(newChart).where('id', id);
      return res.sendStatus(200);
   } catch (err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.adultTeethChart = async (req, res) => {
   const {id} = req.params;
   try {
      const [adultTeethChart] = await AdultTeethChart.query().where('id', id);
      return res.send({adult_teeth_chart: adultTeethChart});
   } catch(err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.updateAdultTeethChart = async (req, res) => {
   const {id} = req.params;
   const newChart = req.body;
   try {
      const result = await AdultTeethChart.query().patch(newChart).where('id', id);
      return res.sendStatus(200);
   } catch (err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}
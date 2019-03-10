const Patient = require('../models/Patient');
const AdultTeethChart  =  require('../models/AdultTeethChart');
const ChildTeethChart  =  require('../models/ChildTeethChart');
const moment = require('moment');
const generate = require('nanoid/generate');

module.exports.patients = async (req, res) => {
   let {search} = req.query;
   if(!search) 
      patients = patients = await Patient.query().orderBy('id', 'desc');
   else 
      patients = await Patient.query().whereRaw(`LOWER(name) like "%${search.toLowerCase()}%"`);
   return res.send({patients});
}

module.exports.getPatientByCode = async (req, res) => {
   const {code} = req.params;
   try {
      const [patient] = await Patient.query().where('code', code);
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

      newPatient.last_visit = '1000-01-01 00:00:00';
      newPatient.code = newPatientCode;
     
      const patient = await Patient.query().insertAndFetch(newPatient);
      if(!patient)
         return res.status(500).send({error: 'Internal server error'});
      const adultTeethChart = await AdultTeethChart.query().insert({patient_id: patient.id});
      const childTeethChart = await ChildTeethChart.query().insert({patient_id: patient.id});
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
      const [childTeethChart] = await ChildTeethChart.query().where('patient_id', id);
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
      const result = await ChildTeethChart.query().patch(newChart).where('patient_id', id);
      return res.sendStatus(200);
   } catch (err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}

module.exports.adultTeethChart = async (req, res) => {
   const {id} = req.params;
   try {
      const [adultTeethChart] = await AdultTeethChart.query().where('patient_id', id);
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
      const result = await AdultTeethChart.query().patch(newChart).where('patient_id', id);
      return res.sendStatus(200);
   } catch (err) {
      console.log(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}
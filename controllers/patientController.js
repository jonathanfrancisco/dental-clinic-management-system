const Patient = require('../models/Patient');
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
     
      const result = await Patient.query().insert(newPatient);
      if(!result)
         return res.status(500).send({error: 'Internal server error'});
      return res.sendStatus(200);
   } catch(err) {
      console.error(err);
      return res.status(500).send({error: 'Internal server error'});
   }
}
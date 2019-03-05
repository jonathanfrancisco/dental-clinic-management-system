const Patient = require('../models/Patient');

module.exports.patients = async (req, res) => {
   const patients = await Patient.query().orderBy('id', 'desc');
   console.log(patients);
   return res.send({patients});
}
const Patient = require('../models/Patient');

module.exports.patients = async (req, res) => {
   let {search} = req.query;
   if(!search) 
      patients = patients = await Patient.query().orderBy('id', 'desc');
   else 
      patients = await Patient.query().whereRaw(`LOWER(name) like "%${search.toLowerCase()}%"`);
   return res.send({patients});
}
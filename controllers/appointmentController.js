const Appointment = require('../models/Appointment');
const {raw} = require('objection');
const moment = require('moment');

module.exports.appointments = async (req, res) => {
   
   try {
     
      let appointments;
      
      if(req.query.startDate && req.query.endDate) {
         appointments = await Appointment.query().select('appointment.*', 'patient.name')
         .join('patient','patient.id', 'appointment.patient_id')
         .whereBetween('date_time', [req.query.startDate+' 00:00:00', req.query.endDate+' 23:59:59'])
         .orderBy(raw('UNIX_TIMESTAMP(appointment.date_time)'),'ASC');
   
      }
      else
         appointments = await Appointment.query().select('appointment.*', 'patient.name')
                           .join('patient','patient.id', 'appointment.patient_id')
                           .orderBy(raw('UNIX_TIMESTAMP(date_time)'),'ASC');
      
      res.send({appointments});
   } catch(err) {
      console.log(err);
      return res.status(500).send({message: 'Internal server error'});
   }


}
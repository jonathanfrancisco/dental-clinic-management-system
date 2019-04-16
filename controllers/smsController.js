const Patient = require('../models/Patient');
const {raw} = require('objection');
const moment = require('moment');
const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// const AWS = require('aws-sdk');
// AWS.config.update({region: 'us-east-1'});


module.exports.getRecipients = async (req, res) => {

   const {search} = req.query;
   const todayInUnix = moment().startOf('today').unix();
   let recipients;
 
   try {
      
      if(!search) {
         recipients = await Patient.query()
                  .select('patient.id',
                          'patient.name', 
                          'patient.contact_number',
                          raw('(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit'),
                          raw('(SELECT SUM((SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id GROUP BY treatment.id)) as total FROM treatment WHERE treatment.patient_id = patient.id)   as total_balance'),
                          raw(`(SELECT date_time FROM appointment WHERE appointment.patient_id = patient.id AND UNIX_TIMESTAMP(appointment.date_time) > ${todayInUnix} AND appointment.status = 'confirmed' ORDER BY UNIX_TIMESTAMP(date_time) DESC LIMIT 1) as next_appointment`)
                        )
      }
      
      else {
         recipients = await Patient.query()
         .select('patient.id',
                 'patient.name', 
                 'patient.contact_number',
                 raw('(SELECT date_treated FROM treatment WHERE treatment.patient_id = patient.id ORDER BY UNIX_TIMESTAMP(date_treated) DESC LIMIT 1) as last_visit'),
                 raw('(SELECT SUM((SELECT treatment.total_amount_to_pay - SUM(payment_transaction.amount_paid) FROM payment_transaction WHERE payment_transaction.treatment_id = treatment.id GROUP BY treatment.id)) as total FROM treatment WHERE treatment.patient_id = patient.id)   as total_balance'),
                 raw(`(SELECT date_time FROM appointment WHERE appointment.patient_id = patient.id AND UNIX_TIMESTAMP(appointment.date_time) > ${todayInUnix} ORDER BY UNIX_TIMESTAMP(date_time) DESC LIMIT 1) as next_appointment`)
         )
         .whereRaw(`LOWER(patient.name) like "%${search.toLowerCase()}%"`)
      }

      return res.send({recipients});

   } catch(err) {
      console.log(err);
      return res.status(500).send({message: 'Internal server error'});
   }
}

module.exports.sendCustomMessage = async (req, res) => {

   const {message, recipients} = req.body;
   try {

      // USING TWILIO SMS API
      recipients.forEach((recipient) => {
         twilio.messages.create({
            from: '+18479062302',
            body: `FROM: ANDRES DENTAL CLINIC\n\n${message}`,
            to: `+63${recipient.contact_number.substring(1, 11)}`
         }).then(message => console.log(message.to, message.body)).done();
      });
       
      // // USING AWS SNS SMS API
      // recipients.forEach((recipient) => {
      //    new AWS.SNS({apiVersion: '2010-03-31'}).publish({
      //       Message: `FROM: ANDRES DENTAL CLINIC\n\n${message}`,
      //       PhoneNumber: `+63${recipient.contact_number.substring(1, 11)}`
      //    }).send((err, data) => {
      //       if(err)
      //          throw new Error(err);
      //    });
      // });

      return res.sendStatus(200);


   } catch(err) {
      console.log(err);
      return res.sendStatus(500);
   }
   
}

module.exports.sendBalanceNotice = (req, res) => {
   const {recipients} = req.body;
   try {

       // USING TWILIO SMS API
      recipients.forEach((recipient) => {
         twilio.messages.create({
            from: '+18479062302',
            body: `FROM: ANDRES DENTAL CLINIC\n\nHello, ${recipient.name}! You have a total remaining balance of ₱${recipient.total_balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} on your record. Kindly visit us anytime regarding about your balance.`,
            to: `+63${recipient.contact_number.substring(1, 11)}`
         }).then(message => console.log(message.to, message.body)).done();
      });

      // // USING AWS SNS SMS API
      // recipients.forEach((recipient) => {
      //    new AWS.SNS({apiVersion: '2010-03-31'}).publish({
      //       Message: `FROM: ANDRES DENTAL CLINIC\n\nHello, ${recipient.name}! You have a total remaining balance of ₱${recipient.total_balance.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} on your record. Kindly visit us anytime regarding about your balance.`,
      //       PhoneNumber: `+63${recipient.contact_number.substring(1, 11)}`
      //    }).send((err, data) => {
      //       if(err)
      //          throw new Error(err);
      //    });
      // });

      
      return res.sendStatus(200);
   } catch(err) {
      console.log(err);
      return res.sendStatus(500);
   }
}


module.exports.sendAppointmentNotice = (req, res) => {
   const {recipients} = req.body;
   try {

      // USING TWILIO SMS API
      recipients.forEach((recipient) => {
         twilio.messages.create({
            from: '+18479062302',
            body: `FROM: ANDRES DENTAL CLINIC\n\nHello, ${recipient.name}! This is a reminder of your appointment on ${moment(recipient.next_appointment).format('MMMM DD, YYYY')} @ ${moment(recipient.next_appointment).format('h:mm A')}`,
            to: `+63${recipient.contact_number.substring(1, 11)}`
         }).then(message => console.log(message.to, message.body)).done();
      });

      // // USING SNS SMS API
      // recipients.forEach((recipient) => {
      //    new AWS.SNS({apiVersion: '2010-03-31'}).publish({
      //       Message: `FROM: ANDRES DENTAL CLINIC\n\nHello, ${recipient.name}! This is a reminder of your appointment on ${moment(recipient.next_appointment).format('MMMM DD, YYYY')} @ ${moment(recipient.next_appointment).format('h:mm A')}`,
      //       PhoneNumber: `+63${recipient.contact_number.substring(1, 11)}`
      //    }).send((err, data) => {
      //       if(err)
      //          throw new Error(err);
      //    });
      // });


      return res.sendStatus(200);
   } catch(err) {
      console.log(err);
      return res.sendStatus(500);
   }
}
const Appointment = require('../models/Appointment');
const config = require('../config');
const { raw } = require('objection');
const moment = require('moment');
const twilio = require('twilio')(
  config.twilioAccountSid,
  config.twiliAuthToken
);
// const AWS = require('aws-sdk');
// AWS.config.update({region: 'ap-southeast-1'});

module.exports.createInPersonAppointment = async (req, res) => {
  const newAppointment = req.body;
  newAppointment.patient_id = parseInt(newAppointment.patient_id);
  newAppointment.status = 'confirmed';
  try {
    const appointment = await Appointment.query().insert(newAppointment);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports.createOnlineAppointment = async (req, res) => {
  const newAppointment = req.body;
  newAppointment.patient_id = parseInt(newAppointment.patient_id);
  newAppointment.status = 'pending';
  try {
    const appointment = await Appointment.query().insert(newAppointment);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports.declineCancelAppointment = async (req, res) => {
  const { id, date_time, name, contact_number, type, reasonMessage } = req.body;
  const newStatus = type === 'decline' ? 'declined' : 'cancelled';
  const message =
    type === 'decline'
      ? `Hello, ${name}! Unfortunately, your request of appointment on ${moment(
          date_time
        ).format('MMMM DD, YYYY')} @ ${moment(date_time).format(
          'h:mm A'
        )} has been declined. Reason: "${reasonMessage}"`
      : `Hello, ${name}! Unfortunately, your scheduled appointment on ${moment(
          date_time
        ).format('MMMM DD, YYYY')} @ ${moment(date_time).format(
          'h:mm A'
        )} has been cancelled. Reason: "${reasonMessage}"`;
  try {
    const declineCancelAppointment = await Appointment.query()
      .patchAndFetchById(id, {
        status: newStatus,
      })
      .then(() => {
        // USING TWILIO SMS API
        if (contact_number)
          twilio.messages
            .create({
              from: '+1847906 2302',
              body: `FROM: ANDRES DENTAL CLINIC\n\n${message}`,
              to: `+63${contact_number.substring(1, 11)}`,
            })
            .then((message) => console.log(message.to, message.body));

        // // USING AWS SNS SMS API
        // if(contact_number)
        //    new AWS.SNS({apiVersion: '2010-03-31'}).publish({
        //       Message: `FROM: ANDRES DENTAL CLINIC\n\n${message}`,
        //       PhoneNumber: `+63${contact_number.substring(1, 11)}`
        //    }).send((err, data) => {
        //       console.log(data);
        //       if(err)
        //          throw new Error(err);
        //    });
      });
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

module.exports.confirm = async (req, res) => {
  const { id, name, contact_number } = req.body;
  const appointmentDate = `${moment(req.body.date_time).format(
    'MMMM DD, YYYY'
  )} @ ${moment(req.body.date_time).format('h:mm A')}`;
  const message = `Hello, ${name}! Your request of appointment on ${appointmentDate} is confirmed. See you soon!`;
  const confirmAppointment = await Appointment.query()
    .patchAndFetchById(id, { status: 'confirmed' })
    .then(() => {
      // USING TWILIO SMS API
      if (contact_number)
        twilio.messages
          .create({
            from: '+1847906 2302',
            body: `FROM: ANDRES DENTAL CLINIC\n\n${message}`,
            to: `+63${contact_number.substring(1, 11)}`,
          })
          .then((message) => console.log(message.to, message.body));

      // USING AWS SNS SMS API
      // if(contact_number)
      //    new AWS.SNS({apiVersion: '2010-03-31'}).publish({
      //       Message: `FROM: ANDRES DENTAL CLINIC\n\n${message}`,
      //       PhoneNumber: `+63${contact_number.substring(1, 11)}`
      //    }).send((err, data) => {
      //       console.log(data);
      //       if(err)
      //          throw new Error(err);
      //    });
    });

  return res.sendStatus(200);
};

module.exports.appointments = async (req, res) => {
  try {
    let appointments;

    if (req.query.startDate && req.query.endDate) {
      //    .orderBy(raw('UNIX_TIMESTAMP(appointment.date_time)'),'ASC');

      if (req.query.search) {
        appointments = await Appointment.query()
          .select('appointment.*', 'patient.name', 'patient.contact_number')
          .join('patient', 'patient.id', 'appointment.patient_id')
          .whereRaw(
            `LOWER(patient.name) like "%${req.query.search.toLowerCase()}%"`
          )
          .whereBetween('date_time', [
            req.query.startDate + ' 00:00:00',
            req.query.endDate + ' 23:59:59',
          ])
          .orderBy('appointment.id', 'DESC');
      } else {
        appointments = await Appointment.query()
          .select('appointment.*', 'patient.name', 'patient.contact_number')
          .join('patient', 'patient.id', 'appointment.patient_id')
          .whereBetween('date_time', [
            req.query.startDate + ' 00:00:00',
            req.query.endDate + ' 23:59:59',
          ])
          .orderBy('appointment.id', 'DESC');
      }
    } else {
      if (req.query.search) {
        appointments = await Appointment.query()
          .select('appointment.*', 'patient.name', 'patient.contact_number')
          .join('patient', 'patient.id', 'appointment.patient_id')
          .whereRaw(
            `LOWER(patient.name) like "%${req.query.search.toLowerCase()}%"`
          )
          .orderBy('appointment.id', 'DESC');
      } else {
        appointments = await Appointment.query()
          .select('appointment.*', 'patient.name', 'patient.contact_number')
          .join('patient', 'patient.id', 'appointment.patient_id')
          .orderBy('appointment.id', 'DESC');
      }
    }

    res.send({ appointments });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Internal server error' });
  }
};

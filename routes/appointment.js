const Router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');


Router.get('/', appointmentController.appointments);
Router.post('/create/in-person', appointmentController.createInPersonAppointment);
Router.post('/confirm', appointmentController.confirm);
Router.patch('/decline-cancel', appointmentController.declineCancelAppointment);

module.exports = Router;

const Router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');


Router.get('/', appointmentController.appointments);
Router.post('/create/in-person', appointmentController.createInPersonAppointment);

module.exports = Router;

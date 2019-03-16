const Router = require('express').Router();
const appointmentController = require('../controllers/appointmentController');


Router.get('/', appointmentController.appointments);

module.exports = Router;

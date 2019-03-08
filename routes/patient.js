const Router = require('express').Router();
const patientController = require('../controllers/patientController');

Router.get('/', patientController.patients);
Router.get('/:code', patientController.getPatientByCode);
Router.post('/create', patientController.create);
Router.patch('/:code/update', patientController.update);

module.exports = Router;
const Router = require('express').Router();
const patientController = require('../controllers/patientController');

Router.get('/', patientController.patients);
Router.get('/:code', patientController.getPatientByCode);
Router.post('/create', patientController.create);
Router.patch('/:code/update', patientController.update);
Router.get('/:id/childteethchart', patientController.childTeethChart);
Router.patch('/:id/childteethchart', patientController.updateChildTeethChart);

module.exports = Router;
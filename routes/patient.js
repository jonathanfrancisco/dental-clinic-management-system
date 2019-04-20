const Router = require('express').Router();
const patientController = require('../controllers/patientController');

Router.get('/', patientController.patients);
Router.get('/:code', patientController.getPatientByCode);
Router.post('/create', patientController.create);
Router.post('/:patientId', patientController.getPatientById);
Router.patch('/:code/update', patientController.update);
Router.post('/:code/validate', patientController.validatePatientCode);
Router.get('/:id/myBalances', patientController.getMyBalances);
Router.get('/:id/myAppointments', patientController.getMyAppointments);
Router.post('/:id/cancelAppointment', patientController.cancelAppointment);
Router.get('/:id/childteethchart', patientController.childTeethChart);
Router.patch('/:id/childteethchart', patientController.updateChildTeethChart);
Router.get('/:id/adultteethchart', patientController.adultTeethChart);
Router.patch('/:id/adultteethchart', patientController.updateAdultTeethChart);



module.exports = Router;
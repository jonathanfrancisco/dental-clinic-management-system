const Router = require('express').Router();
const withAuth = require('../services/withAuth');
const treatmentController = require('../controllers/treatmentController');


Router.get('/:id', treatmentController.getTreatmentsById);
Router.get('/tooth/:toothPosition/:patientId', treatmentController.getTreatmentsByToothPosition);
Router.post('/:id/add', withAuth, treatmentController.add);
Router.delete('/:id/delete', withAuth, treatmentController.delete);

module.exports = Router;

const Router = require('express').Router();
const withAuth = require('../services/withAuth');
const treatmentController = require('../controllers/treatmentController');


Router.get('/:id', treatmentController.getTreatmentsById);
Router.post('/:id/add', withAuth, treatmentController.add);

module.exports = Router;

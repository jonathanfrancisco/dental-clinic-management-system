const Router = require('express').Router();
const treatmentController = require('../controllers/treatmentController');

Router.get('/:id', treatmentController.getTreatmentsById);


module.exports = Router;

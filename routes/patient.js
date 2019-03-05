const Router = require('express').Router();
const patientController = require('../controllers/patientController');

Router.get('/', patientController.patients);

module.exports = Router;
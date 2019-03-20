const Router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

Router.get('/incomereceivable', dashboardController.incomereceivable);
Router.get('/visits', dashboardController.visits);
module.exports = Router;

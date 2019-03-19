const Router = require('express').Router();
const dashboardController = require('../controllers/dashboardController');

Router.get('/incomereceivable', dashboardController.incomereceivable);

module.exports = Router;

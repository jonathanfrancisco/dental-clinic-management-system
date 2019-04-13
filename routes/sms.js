const Router = require('express').Router();
const smsController = require('../controllers/smsController');
Router.get('/', smsController.getRecipients);



module.exports = Router;
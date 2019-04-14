const Router = require('express').Router();
const smsController = require('../controllers/smsController');

Router.get('/', smsController.getRecipients);
Router.post('/sendCustomMessage', smsController.sendCustomMessage);
Router.post('/sendBalanceNotice',smsController.sendBalanceNotice);
Router.post('/sendAppointmentNotice',smsController.sendAppointmentNotice);


module.exports = Router;
const Router = require('express').Router();
const paymentTransactionController = require('../controllers/paymentTransactionController');


Router.get('/:id', paymentTransactionController.getPaymentTransactionsById);

module.exports = Router;

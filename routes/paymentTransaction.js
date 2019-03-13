const Router = require('express').Router();
const paymentTransactionController = require('../controllers/paymentTransactionController');
const withAuth = require('../services/withAuth');

Router.get('/', paymentTransactionController.payments);
Router.get('/:id', paymentTransactionController.getPaymentTransactionsById);
Router.post('/:id/add', withAuth, paymentTransactionController.addPaymentInstallment);

module.exports = Router;

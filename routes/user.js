const Router = require('express').Router();
const userController = require('../controllers/userController');
const withAuth = require('../services/withAuth');

Router.post('/create', userController.create);
Router.post('/login', userController.login);
Router.get('/checkToken', withAuth, (req, res) => {
   res.sendStatus(200);
});


module.exports = Router;
const Router = require('express').Router();
const userController = require('../controllers/userController');
const withAuth = require('../services/withAuth');
Router.get('/', userController.users);
Router.post('/create', userController.create);
Router.post('/login', userController.login);
Router.post('/logout', userController.logout);
Router.get('/checkToken', withAuth, (req, res) => {
   res.sendStatus(200);
});


module.exports = Router;
const Router = require('express').Router();
const userController = require('../controllers/userController');
const withAuth = require('../services/withAuth');
Router.post('/:username/validate', userController.validateUsername);
Router.post('/:email/validateEmail', userController.validateEmail);
Router.get('/', withAuth, userController.users);
Router.get('/admins', withAuth, userController.admins);
Router.post('/register', userController.register);
Router.post('/create', withAuth, userController.create);
Router.patch('/:id/update', withAuth, userController.update);
Router.delete('/:id/delete', withAuth, userController.delete);
Router.post('/login', userController.login);
Router.post('/logout', userController.logout);
Router.get('/checkToken', withAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});
Router.get('/:id', withAuth, userController.getUserById);
Router.post('/forgotPassword', userController.forgotPassword);
Router.post('/:token/resetPassword', userController.resetPassword);

module.exports = Router;

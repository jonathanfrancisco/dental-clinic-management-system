const Router = require('express').Router();
const userController = require('../controllers/userController');
const withAuth = require('../services/withAuth');
Router.get('/', withAuth,  userController.users);
Router.post('/create', withAuth, userController.create);
Router.delete('/delete', withAuth, userController.delete);
Router.post('/login', userController.login);
Router.post('/logout', userController.logout);
Router.get('/checkToken', withAuth, (req, res) => {
   res.status(200).send({user: req.user});
});
Router.get('/:id', withAuth, userController.getUserById);



module.exports = Router;
const Router = require('express').Router();
const userController = require('../controllers/userController');

Router.post('/create', userController.create);


module.exports = Router;
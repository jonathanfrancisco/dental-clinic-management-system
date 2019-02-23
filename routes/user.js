const Router = require('express').Router();
const userController = require('../controllers/userController');

Router.get('/test', userController.test);


module.exports = Router;
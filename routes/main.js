const express = require('express');

const routes = express.Router();

const mainControllers = require('../controllers/main');

routes.get('/', mainControllers.getMain);
routes.get('/about', mainControllers.getAbout);
routes.get('/projects', mainControllers.getProjects);
module.exports = routes;
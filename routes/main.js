const express = require('express');

const routes = express.Router();

const mainControllers = require('../controllers/main');

routes.get('/', mainControllers.getMain);
routes.get('/about', mainControllers.getAbout);
routes.get('/projects', mainControllers.getProjects);
routes.get('/project/:id', mainControllers.getProjectById);
routes.get('/blogs', mainControllers.getBlogs);
routes.get('/blog/:id', mainControllers.getBlogById);
routes.get('/service', mainControllers.getServices);
routes.get('/contact', mainControllers.getContact);
routes.get('/lang/:l', mainControllers.changeLang);
module.exports = routes;
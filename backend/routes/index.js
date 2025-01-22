//import all routes
//import the express module
const express = require('express');
//call the router method from the express module to create a new router
const router = express.Router();
//import the install router
const installRouter = require('./install.routes');
//add the install router to the main routes
router.use(installRouter);
//export the router
module.exports = router;

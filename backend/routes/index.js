//import all routes
//import the express module
const express = require('express');
//call the router method from the express module to create a new router
const router = express.Router();
//import the install router
const installRouter = require('./install.routes');
//add the install router to the main routes
//import the employee router
const employeeRouter = require('./employee.routes');
//import the customer router
const customerRouter = require('./customer.routes');
//import service router
const serviceRouter = require('./service.routes');
//import vehicle router
const vehicleRouter = require('./vehicle.routes');
//import login router
const loginRouter = require('./login.routes');
//add the employee router to the main routes
router.use(employeeRouter);
router.use(installRouter);
router.use(customerRouter);
router.use(serviceRouter);
router.use(vehicleRouter)
router.use(loginRouter);
//export the router
module.exports = router;

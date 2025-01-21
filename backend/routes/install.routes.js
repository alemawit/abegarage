//import express from 'express';
const express = require('express');
const router = express.Router();
const installController = require('../controllers/install.controller');
//create a route to handle the install request on get
router.get('/install', installController.install);
//export the router
module.exports = router;
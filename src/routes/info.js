const express = require('express');

const router = express.Router();


const info_controller = require('../controllers/info_controller.js');
const controller = new info_controller;





router.get('/', controller.mostrarInicio);



module.exports = router;
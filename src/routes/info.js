const express = require('express');
const { isAuthenticated } = require('../helpers/isAuthenticated');
const identificadorRol = require('../helpers/identificadorRol');

const router = express.Router();


const info_controller = require('../controllers/info_controller.js');
const controller = new info_controller;


router.get('/', controller.mostrarInicio);

router.get('/preguntas_frecuentes', controller.mostrarPreguntas);

router.get('/registro_auditoria',isAuthenticated, identificadorRol.esAdministrador, controller.mostrarRegistroAuditoria);



module.exports = router;
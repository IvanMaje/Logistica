const express = require('express');
const { isAuthenticated } = require('../helpers/isAuthenticated');
const identificadorRol = require('../helpers/identificadorRol');
const { revisarVersion } = require('../helpers/revisarVersion');

const router = express.Router();


const info_controller = require('../controllers/info_controller.js');
const controller = new info_controller;


router.get('/', controller.mostrarInicio);

router.get('/preguntas_frecuentes', controller.mostrarPreguntas);

router.get('/cotizacion', controller.mostrarFormularioCotizacion);

router.post('/cotizacion', controller.enviarConsulta);

router.get('/contacto', controller.mostrarContacto);

router.get('/registro_auditoria',isAuthenticated, identificadorRol.esAdministrador, revisarVersion, controller.mostrarRegistroAuditoria);



module.exports = router;
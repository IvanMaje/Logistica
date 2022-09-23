const express = require('express');
const { isAuthenticated } = require('../helpers/isAuthenticated');
const identificadorRol = require('../helpers/identificadorRol');

const router = express.Router();

const carpetas_controller = require('../controllers/carpetas_controller.js');
const controller = new carpetas_controller;


router.get('/crear_carpeta', isAuthenticated, identificadorRol.esMiembro,controller.mostrarFormularioCarpeta);

router.post('/crear_carpeta', isAuthenticated, identificadorRol.esMiembro, controller.crearCarpeta);

router.get('/ver_carpetas/:soloMias/:filtro?', isAuthenticated, identificadorRol.esMiembro, controller.mostrarCarpetas);

router.post('/ver_carpetas', isAuthenticated, identificadorRol.esMiembro, controller.redirigirAVerCarpetas);

router.get('/ver_carpeta/:id', isAuthenticated, identificadorRol.esMiembro, controller.verCarpeta);

router.post('/crear_estado/:id/:num', isAuthenticated, identificadorRol.esMiembro, controller.crearEstado);

router.get('/mis_carpetas/:id', isAuthenticated, identificadorRol.esCliente, controller.MisCarpetasCliente);

router.get('/ver_mi_carpeta/:id/:num', isAuthenticated, identificadorRol.esCliente, controller.verMiCarpetaCliente);





module.exports = router;
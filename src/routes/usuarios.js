const express = require('express');

const router = express.Router();
const { validateCreate } = require('../validators/Usuarios');

const usuarios_controller = require('../controllers/usuarios_controller.js');
const controller = new usuarios_controller;

router.get('/registrar_usuario', controller.mostrarFormularioRegistro);

router.post('/registrar_usuario', validateCreate, controller.RegistrarUsuario);



module.exports = router;
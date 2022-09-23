const express = require('express');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/isAuthenticated');
const identificadorRol = require('../helpers/identificadorRol');

const router = express.Router();
const { validarRegistro } = require('../validators/Usuarios');
const { validarInicioSesion } = require('../validators/UsuarioInicioSesion');
const { validarEdicion } = require('../validators/EdicionUsuario');

const usuarios_controller = require('../controllers/usuarios_controller.js');
const controller = new usuarios_controller;

router.get('/ver_usuarios/:rol/:filtro?', isAuthenticated, identificadorRol.esMiembro, controller.verUsuarios);

router.post('/ver_usuarios/:rol', isAuthenticated, identificadorRol.esMiembro, controller.redirigirAVerUsuarios);

router.get('/registrar_usuario', isAuthenticated, identificadorRol.esMiembro, controller.mostrarFormularioRegistro);

router.post('/registrar_usuario', isAuthenticated, identificadorRol.esMiembro, validarRegistro, controller.RegistrarUsuario);

router.get('/editar_usuario/:id', isAuthenticated, identificadorRol.esMiembro, controller.mostrarFormularioEdicion);  

router.post('/editar_usuario/:id', isAuthenticated, identificadorRol.esMiembro, validarEdicion, controller.editarUsuario);

router.get('/iniciar_sesion', controller.mostrarFormularioInicioSesion);  
  
router.post('/iniciar_sesion', validarInicioSesion, passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/iniciar_sesion',
    failureFlash: true
}));

router.get('/cerrar_sesion', isAuthenticated, async(req, res, next) => {
  
  req.logout(function(err) {
    if (err) { 
      return send('Error'); 
      }
    
    console.log('Sesion Cerrada');
    res.redirect('/');
  });
});




module.exports = router;
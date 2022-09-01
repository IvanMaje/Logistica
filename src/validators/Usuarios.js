const { check } = require('express-validator');
const { validationResult } = require('express-validator');

const validateCreate = [

    check('Rol')
    .isIn([1, 2 , 3])
    .withMessage('Rol incorrecto'),

    check('Cuit')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ingresar numero de Cuit')
    .isNumeric()
    .withMessage('El cuil debe ser solo numeros')
    .isLength({ min: 11, max: 11 })
    .withMessage('El cuil debe tener 11 caracteres'),

    check('Nombre')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ingresar nombre')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
    .withMessage('El nombre debe contener solo letras y no puede tener espacios'),

    check('Apellido')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Debe ingresar apellido')
    .matches(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+([a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)
    .withMessage('El apellido debe contener solo letras y no puede tener espacios'),
    
    (req, res, next) => {
        try{
            validationResult(req).throw();
            return next()
        } catch (err){
            console.log(err.errors[0].msg);
            const datos = {
                Rol: req.body.Rol,
                Cuit: req.body.Cuit,
                Nombre: req.body.Nombre,
                Apellido: req.body.Apellido
            }
            console.log(datos);
            res.render('usuarios/registrar_usuario.ejs', {titulo: 'Inicio', archivo_css: '/css/usuarios/registrar_usuarios.css', usuario: 'Lionel Messi', rol: 'administrador', datosRegistro: datos, error: err.errors[0].msg})
        }
    }
]

module.exports = { validateCreate }
class UsuarioController{

    mostrarFormularioRegistro(req, res){
        res.render('usuarios/registrar_usuario.ejs', {titulo: 'Inicio', archivo_css: '/css/usuarios/registrar_usuarios.css', usuario: 'Lionel Messi', rol: 'administrador', datosRegistro: undefined, error :undefined})
    }

    async RegistrarUsuario(req, res){
        console.log('usuario registrado');
        console.log(req.body);
        res.send('Bien');
    }

}

module.exports = UsuarioController;
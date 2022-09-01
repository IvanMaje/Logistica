
class InfoController{

    mostrarInicio(req, res){
        res.render('info/index.ejs', {titulo: 'Inicio', archivo_css: '/info/index', usuario: 'Lionel Messi', rol: 'administrador'})
    }

}

module.exports = InfoController;
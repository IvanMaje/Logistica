const { application } = require('express');
const connection = require('../database');

class InfoController{

    mostrarInicio(req, res){
        const usuario = InfoController.verificarSiHayUsuario(req);

        res.render('info/index.ejs', {titulo: 'Inicio', archivo_css: 'info/index', usuario: usuario})
    }

    mostrarPreguntas(req, res){
        const usuario = InfoController.verificarSiHayUsuario(req);

        res.render('info/preguntas.ejs', {titulo: 'Inicio', archivo_css: 'info/preguntas', usuario: usuario})
    }

    async mostrarRegistroAuditoria(req, res){
        const registros = await connection.query('SELECT * FROM registro_auditoria');
        const usuario = InfoController.verificarSiHayUsuario(req);

        res.render('info/registro_auditoria', {titulo: 'Registro auditoria', archivo_css: 'info/registro_auditoria', usuario: usuario, registros})
    }

    static verificarSiHayUsuario(req){
        if(req.user){
            return req.user
        }
        return undefined
    }

}

module.exports = InfoController;
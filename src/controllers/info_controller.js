const { application } = require('express');
const connection = require('../database');
const nodemailer = require('nodemailer');


class InfoController{

    mostrarInicio(req, res){
        const usuario = InfoController.verificarSiHayUsuario(req);
        res.render('info/index.ejs', {titulo: 'Inicio', archivo_css: 'info/index', usuario: usuario})
    }

    mostrarPreguntas(req, res){
        const usuario = InfoController.verificarSiHayUsuario(req);

        res.render('info/preguntas.ejs', {titulo: 'Inicio', archivo_css: 'info/preguntas', usuario: usuario})
    }

    mostrarFormularioCotizacion(req, res){
        const usuario = InfoController.verificarSiHayUsuario(req);

        res.render('info/cotizacion.ejs', {titulo: 'Cotizacion', archivo_css: 'info/cotizacion', usuario: usuario})
    }

    async enviarConsulta(req, res){
        try{
            const usuario = InfoController.verificarSiHayUsuario(req);

            const {Mail, Nombre, Razon_Social,
                   Tipo_m, Tipo_e, Origen,
                   Destino, Peso, Contenedor} = req.body;

            const texto = "Pedido de cotizacion: \n Mail: " +
                           Mail + "\n Nombre:" + Nombre + 
                           "\n Razon social: " + Razon_Social + 
                           "\n Tipo de mercaderia: " + Tipo_m + 
                           "\n Tipo de embalaje: " + Tipo_e + 
                           "\n Origen: " + Origen + "\n Destino: " + 
                           Destino + "\n Peso: " + Peso + "\n Contenedor: " +
                           Contenedor;

            console.log(texto);

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, 
                auth: {
                  user: '', 
                  pass: '', 
                },
              });

            let info = await transporter.sendMail({
                from: '"Cotizacion" <Cotizacion>', 
                to: "", 
                subject: "Pedido de cotizacion", 
                text: texto, 
            });

            req.flash('succes_msg', 'Pedido de cotizacion enviado');

            res.redirect('/');
        }catch(err){
            console.log(err);
            res.send('error');
        }
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
var mongoose = require('mongoose');
var Usuario = require("../models/Usuario");

var usuarioController = {};

usuarioController.list = function(req, res){
    let usuarios, lista2 ;
    
    function cargarEstado(sql) {
        console.log(sql);
        return new Promise((resolve, reject) => {
            Usuario.find({estado:sql}).exec(function(error, datos){
                if( error ) reject (error);
                resolve(datos);
            });
        });
    }
    
    Promise.all([
        cargarEstado("A"),
        cargarEstado("B")    
    ])
    .then(lista => {
        usuarios = lista[0];
        lista2 = lista[1];
        console.log('usuarios: ', usuarios);
        console.log('lista2: ', lista2);
        res.render('../views/usuario/index', {usuarios: usuarios, usuariosA: lista2, titulo:'INDEX'} );
    })
    .catch(error => {
        console.log(err)
    });
};

/*
usuarioController.list = function(req, res){
    let usuarios, lista2 ;
    let cad;
    function cargarEstado(sql) {
        console.log(sql);
        return new Promise((resolve, reject) => {
            Usuario.find({sql}).exec(function(err, datos){
                if( err ) reject (err);
                resolve(datos);
            });
        });
    }
        
    cargarEstado("estado:'A'")
    .then(lista  => {
        usuarios = lista;
        cad = "estado: 'B'";
        return cargarEstado(cad)
    })
    .then(listaA  => {
        lista2 = listaA;
        console.log('usuarios: ', usuarios);
        console.log('lista2: ', lista2);
        res.render('../views/usuario/index', {usuarios: usuarios, usuariosA: lista2, titulo:'INDEX'} );
    }) 
    .catch(err => {
        console.log(err)
    });
};

*/
/*
usuarioController.list = function(req, res){
    
    Usuario.find({}).exec(function(err, usuarios){
        if( err ){ 
            console.log('Error: ', err); return; }
        console.log("The INDEX");
        res.render('../views/usuario/index', {usuarios: usuarios,titulo:'INDEX'} );
    });
};
*/
usuarioController.create = function(req, res){
    res.render('../views/usuario/create');
};

usuarioController.show = function(req, res){
    Usuario.findOne({_id: req.params.id}).exec(function(err, usuario){
        if( err ){ console.log('Error: ', err); return; }
        
        res.render('../views/usuario/show', {usuario: usuario} );
    });
    
};

usuarioController.edit = function(req, res) {
    Usuario.findOne({_id: req.params.id}).exec(function (err, usuario) {
      if (err) { console.log("Error:", err); return; }
      
      res.render("../views/usuario/edit", {usuario: usuario});
      
    });
  };
  
  usuarioController.update = function(req, res){
    Usuario.findByIdAndUpdate( req.params.id, {$set: {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        estado: req.body.estado
    }}, { new: true },
    function( err, usuario){
        if( err ){ 
            console.log('Error: ', err); 
            res.render('../views/usuario/edit', {usuario: req.body} );
        }
        
        console.log( usuario );
        
        res.redirect('/usuarios/show/' + usuario._id);
        
    });
};

usuarioController.delete = function(req, res){
    
    Usuario.remove({_id: req.params.id}, function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Usuario deleted!");
        res.redirect("/usuarios");
    });
    
};

usuarioController.save = function(req, res){
    var usuario = new Usuario( req.body );
    
    usuario.save(function(err){
        if( err ){ console.log('Error: ', err); return; }
        
        console.log("Successfully created a usuario. :)");
        res.redirect("/usuarios/show/"+usuario._id);
        //res.redirect("/usuarios");
    });
};


module.exports = usuarioController;
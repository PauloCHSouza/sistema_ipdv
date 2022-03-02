module.exports = function(application) {
    //Rotas dos usuários   
    application.get("/usu/usuarios/index", function(req, res) {
        application.app.controllers.usuarios.index(application, req, res);
    });
    application.post("/usu/usuarios/salvar", function(req, res) {
        application.app.controllers.usuarios.usuario_salvar(application, req, res);
    });  
    application.post("/usu/usuarios/editar", function(req, res) {
        application.app.controllers.usuarios.usuario_editar(application, req, res);
    });
    application.delete("/usu/usuarios/excluir", function(req, res) {
        application.app.controllers.usuarios.usuario_excluir(application, req, res);
    });

    //Rota que lista os usuários por departamento
    application.get("/usu/usuarioDepartamento/index", function(req, res) {
        application.app.controllers.usuarios.usuarioDepartamento(application, req, res);
    });
}
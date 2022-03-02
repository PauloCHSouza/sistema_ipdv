module.exports = function(application) {
    //Rotas dos departamantos   
    application.get("/usu/departamentos/index", function(req, res) {
        application.app.controllers.departamentos.index(application, req, res);
    });
    application.post("/usu/departamentos/salvar", function(req, res) {
        application.app.controllers.departamentos.departamento_salvar(application, req, res);
    });  
    application.post("/usu/departamentos/editar", function(req, res) {
        application.app.controllers.departamentos.departamento_editar(application, req, res);
    });
    application.delete("/usu/departamentos/excluir", function(req, res) {
        application.app.controllers.departamentos.departamento_excluir(application, req, res);
    });

    //Rota que lista os usuários por departamento
    application.get("/usu/departamentosCentroCusto/index", function(req, res) {
        application.app.controllers.departamentos.departamentoCentroCusto(application, req, res);
    });
}
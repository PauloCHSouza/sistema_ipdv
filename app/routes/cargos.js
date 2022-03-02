module.exports = function(application) {
    //Rotas dos cargos   
    application.get("/usu/cargos/index", function(req, res) {
        application.app.controllers.cargos.index(application, req, res);
    });
    application.post("/usu/cargos/salvar", function(req, res) {
        application.app.controllers.cargos.cargo_salvar(application, req, res);
    });  
    application.post("/usu/cargos/editar", function(req, res) {
        application.app.controllers.cargos.cargo_editar(application, req, res);
    });
    application.delete("/usu/cargos/excluir", function(req, res) {
        application.app.controllers.cargos.cargo_excluir(application, req, res);
    });
}
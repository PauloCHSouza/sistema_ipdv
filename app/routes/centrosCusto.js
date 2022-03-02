module.exports = function(application) {
    //Rotas dos centros de custo   
    application.get("/fin/centrosCusto/index", function(req, res) {
        application.app.controllers.centrosCusto.index(application, req, res);
    });
    application.post("/fin/centrosCusto/salvar", function(req, res) {
        application.app.controllers.centrosCusto.centroCusto_salvar(application, req, res);
    });  
    application.post("/fin/centrosCusto/editar", function(req, res) {
        application.app.controllers.centrosCusto.centroCusto_editar(application, req, res);
    });
    application.delete("/fin/centrosCusto/excluir", function(req, res) {
        application.app.controllers.centrosCusto.centroCusto_excluir(application, req, res);
    });
}
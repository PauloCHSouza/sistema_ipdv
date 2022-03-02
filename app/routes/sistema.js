module.exports = function(application) {
    //Rota que importa uma lista de usuários seus cargos, departamentos e centro de custo
    application.post("/sis/autenticar", function(req, res) {
        application.app.controllers.sistema.autenticar(application, req, res);
    });

    //Rota que importa uma lista de usuários seus cargos, departamentos e centro de custo
    application.post("/sis/importacoes/usuarios", function(req, res) {
        application.app.controllers.sistema.importacaoUsuarios(application, req, res);
    });
}
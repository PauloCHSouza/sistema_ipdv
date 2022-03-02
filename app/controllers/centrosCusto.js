//Controllers dos centros de custo
const centroCusto = [];
module.exports.index = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    var connection = application.config.dbConnection();
    var centroCustoModel = new application.app.models.centrosCustoDAO(connection);

    centroCustoModel.getCentrosCusto(function(error, result){
        console.log(error)
        res.send(result);
    });
}
module.exports.centroCusto_salvar = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    centroCusto.length = 0;
    centroCusto.push(req.body)

    req.assert("titulo", "Titulo é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var centroCustoModel = new application.app.models.centrosCustoDAO(connection);

    centroCustoModel.salvarCentroCusto(centroCusto, function (error, result) {
        if(error){
            mensagem = 'Erro ao cadastrar centro de custo!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Centro de custo cadastrado com sucesso!' });
        }
        return;
    });
}
module.exports.centroCusto_editar = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    centroCusto.length = 0;
    centroCusto.push(req.body)

    req.assert("idCentroCusto", "Centro de custo é obrigatório").notEmpty();
    req.assert("titulo", "Titulo é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var centroCustoModel = new application.app.models.centrosCustoDAO(connection);

    centroCustoModel.editarCentroCusto(centroCusto, function (error, result) {
        if(error){
            mensagem = 'Erro ao alterar os dados do centro de custo!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Dados do centro de custo alterados com sucesso!' });
        }
        return;
    });
}
module.exports.centroCusto_excluir = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    centroCusto.length = 0;
    centroCusto.push(req.body)

    var connection = application.config.dbConnection();
    var centroCustoModel = new application.app.models.centrosCustoDAO(connection);

    centroCustoModel.excluirCentroCusto(centroCusto, function (error, result) {
        if(error){
            mensagem = 'Erro ao deletar centro de custo!';
            if (error.code == "ER_ROW_IS_REFERENCED_2"){mensagem = 'Centro de custo referenciado: Não foi possivel deletar!'}
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Centro de custo deletado com sucesso!' });
        }
        return;
    });
}
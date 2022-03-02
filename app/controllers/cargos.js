//Controllers dos cargos
const cargo = [];
module.exports.index = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    var connection = application.config.dbConnection();
    var cargosModel = new application.app.models.cargosDAO(connection);

    cargosModel.getCargos(function(error, result){
        res.send(result);
    });
}
module.exports.cargo_salvar = function(application, req, res){

    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    cargo.length = 0;
    cargo.push(req.body)

    req.assert("titulo", "Titulo é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var cargosModel = new application.app.models.cargosDAO(connection);

    cargosModel.salvarCargo(cargo, function (error, result) {
        if(error){
            mensagem = 'Erro ao cadastrar cargo!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Cargo cadastrado com sucesso!' });
        }
        return;
    });
}
module.exports.cargo_editar = function(application, req, res){

    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    cargo.length = 0;
    cargo.push(req.body)

    req.assert("titulo", "Titulo é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var cargosModel = new application.app.models.cargosDAO(connection);

    cargosModel.editarCargo(cargo, function (error, result) {
        if(error){
            mensagem = 'Erro ao alterar os dados do cargo!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Dados do cargo alterados com sucesso!' });
        }
        return;
    });
}
module.exports.cargo_excluir = function(application, req, res){

    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    cargo.length = 0;
    cargo.push(req.body)

    var connection = application.config.dbConnection();
    var cargosModel = new application.app.models.cargosDAO(connection);

    cargosModel.excluirCargo(cargo, function (error, result) {
        if(error){
            mensagem = 'Erro ao deletar cargo!';
            if (error.code == "ER_ROW_IS_REFERENCED_2"){mensagem = 'Cargo referenciado: Não foi possivel deletar!'}
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Cargo deletado com sucesso!' });
        }
        return;
    });
}
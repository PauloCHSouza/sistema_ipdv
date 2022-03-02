//Variáveis constantes
const departamento = [];
const lista = [];

//Controllers dos departamentos
module.exports.index = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    var connection = application.config.dbConnection();
    var departamentosModel = new application.app.models.departamentosDAO(connection);

    departamentosModel.getDepartamentos(function(error, result){
        res.send(result);
    });
}
module.exports.departamento_salvar = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    departamento.length = 0;
    departamento.push(req.body)

    req.assert("idCentroCusto", "Centro de custo é obrigatório").notEmpty();
    req.assert("titulo", "Titulo é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var departamentosModel = new application.app.models.departamentosDAO(connection);

    departamentosModel.salvarDepartamento(departamento, function (error, result) {
        if(error){
            mensagem = 'Erro ao cadastrar departamento!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Departamento cadastrado com sucesso!' });
        }
        return;
    });
}
module.exports.departamento_editar = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    departamento.length = 0;
    departamento.push(req.body)

    req.assert("idCentroCusto", "Centro de custo é obrigatório").notEmpty();
    req.assert("titulo", "Titulo é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var departamentosModel = new application.app.models.departamentosDAO(connection);

    departamentosModel.editarDepartamento(departamento, function (error, result) {
        console.log(error);
        if(error){
            mensagem = 'Erro ao alterar os dados do departamento!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Dados do departamento alterados com sucesso!' });
        }
        return;
    });
}
module.exports.departamento_excluir = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    departamento.length = 0;
    departamento.push(req.body)

    var connection = application.config.dbConnection();
    var departamentosModel = new application.app.models.departamentosDAO(connection);

    departamentosModel.excluirDepartamento(departamento, function (error, result) {
        if(error){
            mensagem = 'Erro ao deletar departamento!';
            if (error.code == "ER_ROW_IS_REFERENCED_2"){mensagem = 'Departamento referenciado: Não foi possivel deletar!'}
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Departamento deletado com sucesso!' });
        }
        return;
    });
}

//Lista departamentos por centro de custo
module.exports.departamentoCentroCusto = function(application, req, res){

    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    var connection = application.config.dbConnection();
    var centroCustoModel = new application.app.models.centrosCustoDAO(connection);
    var departamentosModel = new application.app.models.departamentosDAO(connection);

    centroCustoModel.getCentrosCusto(function(error, resultCentro){

        resultCentro.forEach((val, key, arr) => {
            departamentosModel.getDepartamentoCentroCusto(val.idCentroCusto, function(error, resultDept){
                val.departamentos = JSON.parse(JSON.stringify(resultDept));
                lista.push(val)
                
                if (Object.is(arr.length - 1, key)) {
                    res.send({lista});
                }
            });
        });
    });
}
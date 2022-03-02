//Variáveis constantes
const usuario = [];
const lista = [];

//Controllers dos usuários

module.exports.index = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.usuariosDAO(connection);

    usuariosModel.getUsuarios(function(error, result){
        res.send(result);
    });
}
module.exports.usuario_salvar = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    usuario.length = 0;
    usuario.push(req.body)

    req.assert("nome", "Nome é obrigatório").notEmpty();
    req.assert("sobrenome", "Sobrenome é obrigatório").notEmpty();
    req.assert("idDepartamento", "Departamento é obrigatório").notEmpty();
    req.assert("idCargo", "Cargo é obrigatório").notEmpty();
    req.assert("nascimento", "Data de nascimento é obrigatória").notEmpty();
    req.assert("telCelular", "Celular é obrigatório").notEmpty();
    req.assert("email", "E-mail é obrigatório").notEmpty();
    req.assert("senha", "Senha é obrigatória").notEmpty();
    req.assert("cpf", "CPF é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.usuariosDAO(connection);

    usuariosModel.salvarUsuario(usuario, function (error, result) {
        if(error){
            mensagem = 'Erro ao cadastrar usuário!';
            if (error.code == "ER_DUP_ENTRY"){mensagem = 'Entrada duplicada: O E-mail informado ja existe!'}
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Usuário cadastrado com sucesso!' });
        }
        return;
    });
}
module.exports.usuario_editar = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    usuario.length = 0;
    usuario.push(req.body)

    req.assert("nome", "Nome é obrigatório").notEmpty();
    req.assert("sobrenome", "Sobrenome é obrigatório").notEmpty();
    req.assert("idDepartamento", "Departamento é obrigatório").notEmpty();
    req.assert("idCargo", "Cargo é obrigatório").notEmpty();
    req.assert("nascimento", "Data de nascimento é obrigatória").notEmpty();
    req.assert("telCelular", "Celular é obrigatório").notEmpty();
    req.assert("email", "E-mail é obrigatório").notEmpty();
    req.assert("cpf", "CPF é obrigatório").notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.usuariosDAO(connection);

    usuariosModel.editarUsuario(usuario, function (error, result) {
        if(error){
            mensagem = 'Erro ao alterar os dados do usuário!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Dados do usuário alterados com sucesso!' });
        }
        return;
    });
}
module.exports.usuario_excluir = function(application, req, res){
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    usuario.length = 0;
    usuario.push(req.body)

    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.usuariosDAO(connection);

    usuariosModel.excluirUsuario(usuario, function (error, result) {
        if(error){
            mensagem = 'Erro ao deletar usuário!';
            res.status(400).json({ code: 400, bad_request: mensagem });
        }else{
            res.status(201).json({ code: 201, created: 'Usuário deletado com sucesso!' });
        }
        return;
    });
}

//Lista usuários por departamento
module.exports.usuarioDepartamento = function(application, req, res){

    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }
    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.usuariosDAO(connection);
    var departamentosModel = new application.app.models.departamentosDAO(connection);

    departamentosModel.getDepartamentos(function(error, resultDepart){

        resultDepart.forEach((val, key, arr) => {
            usuariosModel.getUsuariosDepartamentos(val.idDepartamento, function(error, resultUser){
                val.usuarios = JSON.parse(JSON.stringify(resultUser));
                lista.push(val)
                
                if (Object.is(arr.length - 1, key)) {
                    console.log({lista});
                    res.send({lista});
                }
            });
        });
    });
}
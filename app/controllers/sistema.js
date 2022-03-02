const crypto = require('crypto');

//Variáveis constantes
const usuario = [];
const cargo = [];
const departamento = [];
const centrocusto = [];
const erros = [];

//Inicia uma sessão e gara um token
module.exports.autenticar = function(application, req, res){

    req.assert('email', 'Email não deve ser vazio').notEmpty();
    req.assert('senha', 'Senha não deve ser vazia').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.send(erros);
        return;
    }

    var connection = application.config.dbConnection();
    var usuariosModel = new application.app.models.usuariosDAO(connection);

    usuariosModel.autenticar(req.body, function (error, result) {
        if(result != undefined){
            req.session.token = crypto.randomBytes(64).toString('hex');
            res.send({tokenAcesso: req.session.token});
        }else{
            res.send("Erro ao autenticar");
        }
    });
}

//Controller  que importa uma lista de usuários seus cargos, departamentos e centro de custo
module.exports.importacaoUsuarios = function(application, req, res){
   
    if(req.session.token === undefined){
        res.send({code:401, msg:"Necessita de autenticação"})
        return;
    }

    req.body.forEach((val, key, arr) => {

        //Valida erros nos campos do usuário
        if(!!val.nome === false){ erros.push({key: key, param: "nome", msg: "Nome é obrigatório"});};
        if(!!val.sobrenome === false){ erros.push({key: key, param: "sobrenome", msg: "Sobrenome é obrigatório"});};
        if(!!val.nascimento === false){ erros.push({key: key, param: "nascimento", msg: "Data de nascimento é obrigatória"});};
        if(!!val.telCelular === false){ erros.push({key: key, param: "telCelular", msg: "Celular é obrigatório"});};
        if(!!val.email === false){ erros.push({key: key, param: "email", msg: "E-mail é obrigatório"});};
        if(!!val.senha === false){ erros.push({key: key, param: "senha", msg: "Senha é obrigatória"});};
        if(!!val.cpf === false){ erros.push({key: key, param: "cpf", msg: "CPF é obrigatório"});};
        if(!!val.cargo === false){ erros.push(
            {key: key, param: "cargo", msg: "Cargo é obrigatório"});
        }else{
            if(!!val.cargo[0].idCargo === false || !!val.cargo[0].titulo === false){ erros.push({key: key, param: "cargo", msg: "Cargo é obrigatório"});};
        }
        if(!!val.departamento === false){ erros.push(
            {key: key, param: "departamento", msg: "Departamento é obrigatório"});
        }else{
            if(!!val.departamento[0].idDepartamento === false || !!val.departamento[0].titulo === false){ erros.push({key: key, param: "departamento", msg: "Departamento é obrigatório"});};
        }
        if(!!val.departamento[0].centroCusto === false){ erros.push(
            {key: key, param: "centroCusto", msg: "Centro de custo é obrigatório"});
        }else{
            if(!!val.departamento[0].centroCusto[0].idCentroCusto === false || !!val.departamento[0].centroCusto[0].titulo === false){ erros.push({key: key, param: "centroCusto", msg: "Centro de custo é obrigatório"});};
        }
        //FIM das validações

        //Carregamento dos arrays para inserir
        cargo.push(val.cargo);
        centrocusto.push(val.departamento[0].centroCusto);
        departamento.push(val.departamento);
        usuario.push(val);
    });

    if(erros.length > 0){
        res.send(erros);
    }else{
        var connection = application.config.dbConnection();
        var usuariosModel = new application.app.models.usuariosDAO(connection);
        
        usuario.forEach((val, key, arr) => {
            usuario[key].idCargo = cargo[key][0].idCargo
            usuario[key].idDepartamento = departamento[key][0].idDepartamento
            delete val['cargo'];
            delete val['departamento'];
            usuariosModel.salvarUsuario(val, function (error, result) {
                if(!!error){
                    erros.push({key: key, param: "usuario", msg: error.sqlMessage});
                }
                console.log("usuario");
                if(usuario.length -1 == key){
                    if(erros.length > 0){
                        res.send(erros);
                    }else{
                        res.send({code: 200, msg: "Usuários incluídos com sucesso!"});
                    }
                }
            });
        });
        
        
    }
}
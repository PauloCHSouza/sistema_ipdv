function usuariosDAO(connection){
    this._connection = connection
}

//DAO Usuários
    usuariosDAO.prototype.getUsuarios = function (callback){
        this._connection.query('select * from usuUsuarios where ativo = 1', callback);
    }
    usuariosDAO.prototype.getUsuariosDepartamentos = function (paran, callback){
        this._connection.query('select * from usuUsuarios where ativo = 1 and idDepartamento = ' + paran, callback);
    }
    usuariosDAO.prototype.salvarUsuario = function (usuario, callback){
        this._connection.query("insert into usuusuarios set ? ", usuario, callback);
    }
    usuariosDAO.prototype.editarUsuario = function (usuario, callback){
        this._connection.query("update usuusuarios set ? where ?", [usuario[0], { email: usuario[0].email }], callback); 
    }
    usuariosDAO.prototype.excluirUsuario = function (usuario, callback){ 
        this._connection.query("delete from usuUsuarios where ?", [usuario[0], { idUsuario: usuario[0].idUsuario }], callback);
    }

    usuariosDAO.prototype.autenticar = function(usuario, callback){
        this._connection.query('select * from usuUsuarios where ativo = 1 and email = "' + usuario.email + '" and senha = "' + usuario.senha + '"', callback);
    }

module.exports = function(){
    return usuariosDAO;
}

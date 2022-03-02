function departamentosDAO(connection){
    this._connection = connection
}

//DAO Departamentos
    departamentosDAO.prototype.getDepartamentos = function (callback){
        this._connection.query('select * from usuDepartamentos where ativo = 1', callback)
    }
    departamentosDAO.prototype.getDepartamentoCentroCusto = function (paran, callback){
        this._connection.query('select * from usuDepartamentos where ativo = 1 and idCentroCusto = ' + paran, callback)
    }
    departamentosDAO.prototype.salvarDepartamento = function (departamento, callback){
        this._connection.query("insert into usuDepartamentos set ? ", departamento, callback);
    }
    departamentosDAO.prototype.editarDepartamento = function (departamento, callback){
        this._connection.query("update usuDepartamentos set ? where ?", [departamento[0], { idDepartamento: departamento[0].idDepartamento }], callback); 
    }
    departamentosDAO.prototype.excluirDepartamento = function (departamento, callback){ 
        this._connection.query("delete from usuDepartamentos where ?", [departamento[0], { idDepartamento: departamento[0].idDepartamento }], callback);
    }

module.exports = function(){
    return departamentosDAO;
}

function cargosDAO(connection){
    this._connection = connection
}

//DAO Cargos
    cargosDAO.prototype.getCargos = function (callback){
        this._connection.query('select * from usuCargos where ativo = 1', callback)
    }
    cargosDAO.prototype.getCargo = function (paran, callback){
        this._connection.query('select * from usuCargos where ativo = 1 and idCargo = ' + paran.idPK, callback)
    }
    cargosDAO.prototype.salvarCargo = function (cargo, callback){
        this._connection.query("insert into usuCargos set ? ", cargo, callback);
    }
    cargosDAO.prototype.editarCargo = function (cargo, callback){
        this._connection.query("update usuCargos set ? where ?", [cargo[0], { idCargo: cargo[0].idCargo }], callback); 
    }
    cargosDAO.prototype.excluirCargo = function (cargo, callback){ 
        this._connection.query("delete from usuCargos where ?", [cargo[0], { idCargo: cargo[0].idCargo }], callback);
    }

module.exports = function(){
    return cargosDAO;
}

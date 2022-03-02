function centroscustoDAO(connection){
    this._connection = connection
}

//DAO Centroscusto
    centroscustoDAO.prototype.getCentrosCusto = function (callback){
        this._connection.query('select * from finCentroCustos where ativo = 1', callback)
    }
    centroscustoDAO.prototype.getCentroCusto = function (paran, callback){
        this._connection.query('select * from finCentroCustos where ativo = 1 and idCentroCusto = ' + paran.idPK, callback)
    }
    centroscustoDAO.prototype.salvarCentroCusto = function (centrocusto, callback){
        this._connection.query("insert into finCentroCustos set ? ", centrocusto, callback);
    }
    centroscustoDAO.prototype.editarCentroCusto = function (centrocusto, callback){
        this._connection.query("update finCentroCustos set ? where ?", [centrocusto[0], { idCentroCusto: centrocusto[0].idCentroCusto }], callback); 
    }
    centroscustoDAO.prototype.excluirCentroCusto = function (centrocusto, callback){ 
        this._connection.query("delete from finCentroCustos where ?", [centrocusto[0], { idCentroCusto: centrocusto[0].idCentroCusto }], callback);
    }

module.exports = function(){
    return centroscustoDAO;
}

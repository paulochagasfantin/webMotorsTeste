var conn        = require("../db/db")();
var express     = require('express');
var router      = express.Router();
var sql         = require("mssql")


//let usersModel = require('../models/usuarios.model')

const anuncios = {};


anuncios.get = (req, res) => {
    var id = req.params.id;
    conn.connect()
        .then(function () {

            console.log(id)


            if (id == undefined) {
                var sqlQ = 'SELECT * from anuncios ';
            } else {
                var sqlQ = 'SELECT  * from anuncios where id =' + id;
            }
            

            var req = new sql.Request(conn);


            


            req.query(sqlQ)
                .then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                .catch(function (err, status) {
                    conn.close();
                    res.status(400).send('error get data' + err);
                });
        })
        .catch(function (err) {
            conn.close();
            res.status(400).send(err);
        })

}



anuncios.post = (req, res) => {

    var anuncio ={
        Marca: req.params.Marca,
        Modelo: req.params.Modelo,
        Versao: req.params.Versao,
        Ano: req.params.Ano,
        Km: req.params.Quilometragem,
        Obs: req.params.Observacao,
    }
    

    conn.connect()
        .then(function () {



                var sqlQ = 'insert into anuncios  values (' +  
                req.params.Marca            + ','
                req.params.Modelo           + ','
                req.params.Versao           + ','
                req.params.Ano              + ','
                req.params.Quilometragem    + ','
                req.params.Observacao       + ')'
            

                console.log(sqlQ)
            

            var req = new sql.Request(conn);

            req.query(sqlQ)
                .then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                .catch(function (err, status) {
                    conn.close();
                    res.status(400).send('error get data' + err);
                });
        })
        .catch(function (err) {
            conn.close();
            res.status(400).send('error get data fora');
        })


}


anuncios.put = (req, res) => {


    var id = req.params.id;
    conn.connect()
        .then(function () {

            console.log('paulo')


            if (id == undefined) {
                res.status(400).send('pasar o id do log por favor');
                // var sqlQ = 'SELECT id_logs, COD_ROTEIRIZACAO,COD_ROTEIRIZACAO_ROTA from TB_INTEGRACAO_ROUTEASY_LOGS ';
            } else {
                var sqlQ = 'update a set  dt_inclusao  = getdate() from  TB_INTEGRACAO_ROUTEASY_LOGS  a  where id_logs =' + id
            }
            

            var req = new sql.Request(conn);


            


            req.query(sqlQ)
                .then(function (recordset) {
                    res.json(recordset.recordset);
                    conn.close();
                })
                .catch(function (err, status) {
                    conn.close();
                    res.status(400).send('error get data' + err);
                });
        })
        .catch(function (err) {
            conn.close();
            res.status(400).send('error get data fora');
        })


}

module.exports = anuncios;
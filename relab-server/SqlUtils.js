const sql = require('mssql');
const CC = require('./CoordConverter.js');

const coordConverter =  new CC();
 
const config = {
    user: 'PCTO',  //Vostro user name
    password: 'xxx123#', //Vostra password
    server: "213.140.22.237",  //Stringa di connessione
    database: 'Katmai', //(Nome del DB)
}

module.exports = class SqlUtils {

    static connect(req, res, connectedCallback)
    {
        console.log(connectedCallback);
        sql.connect(config, (err) => {
            if (err) console.log(err);  // ... error check
            else connectedCallback(req,res);     //callback da eseguire in caso di connessione avvenuta 
        });
    }

    //Questo metodo ormai è inutile, lo teniamo solo per eseguire dei test
    static makeSqlRequest(req, res) {
        let sqlRequest = new sql.Request();  //sqlRequest: oggetto che serve a eseguire le query
        let q = 'SELECT DISTINCT TOP (100) [WKT] FROM [Katmai].[dbo].[intMil4326WKT]';
        //eseguo la query e aspetto il risultato nella callback
        sqlRequest.query(q, (err, result) => {SqlUtils.sendQueryResults(err,result,res)}); 
    }

    static ciVettRequest(req,res) {
        let sqlRequest = new sql.Request();  //sqlRequest: oggetto che serve a eseguire le query
        let foglio = req.params.foglio;
        let q = `SELECT INDIRIZZO, WGS84_X, WGS84_Y, CLASSE_ENE, EP_H_ND, CI_VETTORE, FOGLIO, SEZ
        FROM [Katmai].[dbo].[intMil4326WKT]
        WHERE FOGLIO = ${foglio}`
        //eseguo la query e aspetto il risultato nella callback
        sqlRequest.query(q, (err, result) => {SqlUtils.sendCiVettReult(err,result,res)}); 
    }

    static ciVettGeoRequest(req,res) {
        let sqlRequest = new sql.Request();  //sqlRequest: oggetto che serve a eseguire le query
        let x = Number(req.params.lng);
        let y = Number(req.params.lat);
        let r = Number(req.params.r);
        let q = `SELECT INDIRIZZO, WGS84_X, WGS84_Y, CLASSE_ENE, EP_H_ND, CI_VETTORE, FOGLIO, SEZ
        FROM [Katmai].[dbo].[intMil4326WKT]
        WHERE WGS84_X > ${x} - ${r} AND 
        WGS84_X < ${x} + ${r} AND
        WGS84_Y > ${y} - ${r} AND 
        WGS84_Y < ${y} + ${r}`
        
        console.log(q);
        //eseguo la query e aspetto il risultato nella callback
        sqlRequest.query(q, (err, result) => {SqlUtils.sendCiVettReult(err,result,res)}); 
    }

    static geoGeomRequest(req, res) {
        let sqlRequest = new sql.Request();  //sqlRequest: oggetto che serve a eseguire le query
        let x = Number(req.params.lng);
        let y = Number(req.params.lat);
        let r = Number(req.params.r);
        let q = `
        SELECT SUM(EP_H_ND) as somma, AVG(EP_H_ND) as media, [WKT] , SEZ
        FROM [Katmai].[dbo].[intMil4326WKT]
        WHERE EP_H_ND > 0 AND SEZ in(
            SELECT DISTINCT SEZ
            FROM [Katmai].[dbo].[intMil4326WKT]
            WHERE WGS84_X > ${x} - ${r} AND 
                  WGS84_X < ${x} + ${r} AND
                  WGS84_Y > ${y} - ${r} AND 
                  WGS84_Y < ${y} + ${r})
        GROUP BY [WKT], SEZ`

        //console.log(q);
        //eseguo la query e aspetto il risultato nella callback
        sqlRequest.query(q, (err, result) => { SqlUtils.sendQueryResults(err, result, res) });
    }
    
    static sendCiVettReult(err,result, res)
    {
        if (err) console.log(err); // ... error checks
        res.send(result.recordset);  //Invio il risultato al Browser
    }
    
    static sendQueryResults(err,result, res)
    {
        if (err) console.log(err); // ... error checks
        res.send(coordConverter.generateGeoJson(result.recordset));  //Invio il risultato al Browser
    }
}
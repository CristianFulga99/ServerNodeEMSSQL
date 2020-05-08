const express = require('express');
const app = new express();

//Importo la classe per le chiamate al DB
const sqlUtils = require('./SqlUtils.js'); 

app.get('/', function (req, res) {
   //Per connettermi al DB uso il metodo statico sqlUtils.connect
   //Passo come parametro la funzione sqlUtils.makeSqlRequest che verrà lanciata 
   //se la connessione al DB avrà successo  
   sqlUtils.connect(req, res, sqlUtils.makeSqlRequest);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get('/ci_vettore/:foglio', function (req, res) {
    console.log(req.params.foglio);
    //richiamo il metodo che ottiene l'elenco dei vettori energetici
    sqlUtils.connect(req, res, sqlUtils.ciVettRequest);
 });
const express = require('express')
const app = express()
const port = 7070
var mysql = require('mysql');

app.get('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Rishi@14101998"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
});

app.listen(port, () => console.log(`Example app listening on port port!`))
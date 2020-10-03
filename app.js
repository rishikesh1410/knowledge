const express = require('express');
const app = express();
const port = 7070;
var mysql = require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Rishi@14101998",
        database : "knowledge"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        
        con.query("SELECT * FROM problems", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


// Retrieving a problem
app.get('/getProblem/:id', (req, res) => {
    const { id } = req.params;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Rishi@14101998",
        database : "knowledge"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        
        let values = [id];
        con.query("SELECT * FROM problems WHERE id = ?", values, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});


// Updating a problem
app.put('/updateProblem/:id', function(req, res) {
    const { problem, solution, link } = req.body;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Rishi@14101998",
        database : "knowledge"
    });
    
    con.connect(function(err) {
        if (err) throw err;

        con.query("UPDATE problems SET problem = '"+problem+"', solution = '"+solution+"', link = '"+link+"' WHERE id = " + req.params.id , function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

// Deleting a problem
app.delete('/deleteProblem/:id', function(req, res) {
    const { id } = req.params;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Rishi@14101998",
        database : "knowledge"
    });
    
    con.connect(function(err) {
        if (err) throw err;

        con.query("DELETE FROM problems WHERE id = " + id, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});

// Adding a problem
app.post('/addProblem', function(req, res) {
    if(req.body.id) {
        res.json({"error" : "Object should not have id"});
    }
    const { problem, solution, link } = req.body;
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Rishi@14101998",
        database : "knowledge"
    });
    
    con.connect(function(err) {
        if (err) throw err;

        con.query("INSERT INTO problems (problem, solution, link) VALUES ('"+problem+"', '"+solution+"', '"+link+"')" , function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
});



app.listen(port, () => console.log(`Example app listening on port port!`))
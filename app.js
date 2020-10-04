const express = require('express');
const app = express();
const port = 7070;
const mysql = require('mysql');
const ejs = require('ejs');
const bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({ extended: false })

const dbConnection = () => {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Rishi@14101998",
        database : "knowledge"
    });
    return con;
}

const error = (msg) => {
    return {"error" : msg};
}

app.use(bodyParser.json());
app.set('view engine', 'ejs');


/***************** HANDLING ROUTES ****************/

app.get('/home', (req,res) => {
    res.render('home');
})

/*****************  / HANDLING ROUTES ****************/

/*****************  REST API ****************/

// Retrieving all problems or based on search query
app.get('/', (req, res) => {
    let problem = "";
    if(req.query.problem) {
        problem = req.query.problem;
    }
    let con = dbConnection();
    con.connect(function(err) {
        if (err) {
            res.json(error("Failed to connect to Database"))
        }
        
        con.query("SELECT * FROM problems WHERE problem LIKE '%"+problem+"%'", function (err, result, fields) {
            if (err) {
                res.json(error("Failed to execute query"));
            }
            res.json(result);
        });
    });
});

// Retrieving a problem
app.get('/getProblem/:id', (req, res) => {
    const { id } = req.params;
    
    let con = dbConnection();
    con.connect(function(err) {
        if (err) {
            res.json(error("Failed to connect to Database"))
        }
        
        let values = [id];
        con.query("SELECT * FROM problems WHERE id = ?", values, function (err, result, fields) {
            if (err) {
                res.json(error("Failed to execute query"));
            }
            res.json(result);
        });
    });
});

// Updating a problem
app.put('/updateProblem/:id', urlencodedParser, function(req, res) {
    if(req.body.id) {
        res.json({"error" : "Object should not have id"});
    }
    const { problem, solution, link } = req.body;
    const { id } = req.params;

    console.log(id);
    console.log(req.body);

    let con = dbConnection();
    con.connect(function(err) {
        if (err) {
            res.json(error("Failed to connect to Database"))
        }

        con.query("UPDATE problems SET problem = '"+problem+"', solution = '"+solution+"', link = '"+link+"' WHERE id = " + id , function (err, result, fields) {
            if (err) {
                res.json(error("Failed to execute query"));
            }
            res.json(result);
        });
    });
});

// Deleting a problem
app.delete('/deleteProblem/:id', function(req, res) {
    const { id } = req.params;
    
    let con = dbConnection();
    con.connect(function(err) {
        if (err) {
            res.json(error("Failed to connect to Database"))
        }

        con.query("DELETE FROM problems WHERE id = " + id, function (err, result, fields) {
            if (err) {
                res.json(error("Failed to execute query"));
            }
            res.json(result);
        });
    });
});

// Adding a problem
app.post('/addProblem', urlencodedParser, function(req, res) {
    if(req.body.id) {
        res.json({"error" : "Object should not have id"});
    }
    console.log(req.body);
    const { problem, solution, link } = req.body;
    
    let con = dbConnection();
    con.connect(function(err) {
        if (err) {
            res.json(error("Failed to connect to Database"))
        }

        con.query("INSERT INTO problems (problem, solution, link) VALUES ('"+problem+"', '"+solution+"', '"+link+"')" , function (err, result, fields) {
            if (err) {
                res.json(error("Failed to execute query"));
            }
            res.json(result);
        });
    });
});

/*****************  / REST API ****************/

app.listen(port, () => console.log(`Example app listening on port port!`))
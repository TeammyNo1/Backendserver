const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON data


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

db.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?) ";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
         
    });
});

app.post('/login', (req, res) => {
    const sql = " SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql,[req.body.email,req.body.password], (err, data) => {
        if (err){
            return res.json("Error");
        }
        if(data.length > 0){
            return res.json("Success");
        }else{
            return res.json("Faile");
        }
    })
});

app.listen(5002, () => {
    console.log("listening");
});

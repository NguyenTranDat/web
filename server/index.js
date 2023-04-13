const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

const port = 9000;

app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "password",
    database: "web"
});

app.get('/', function (req, res) {
    var sql = "SELECT title, name, link FROM book";
    con.query(sql, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
});

app.get('/van', function (req, res) {
    var sql = "SELECT title, name, link FROM book WHERE title like '%Văn học%'";
    con.query(sql, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
});

app.get('/trinhtham', function (req, res) {
    var sql = "SELECT title, name, link FROM book WHERE title like '%Trinh thám%'";
    con.query(sql, function(err, results) {
      if (err) throw err;
      res.send(results);
    });
});

app.get('/cart', function (req, res) {
  var sql = "SELECT title, name, link FROM book WHERE title like '%Trinh thám%'";
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, ()=> {
    console.log(port)
})
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "password",
    database: "web"
});

module.exports = con;
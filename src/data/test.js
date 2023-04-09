var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "newuser",
  password: "password",
  database: "web"
});

const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
  input: fs.createReadStream('link.txt')
});

const values = []

function get(line) {
  var i = 0;
  var x = []
  //title
  var title = '';
  for(; i<line.length; ++i) {
    if(line[i] == '\\') break;
    else title = title + line[i];
  }

  //name
  var name = '';
  ++i;
  for(; i<line.length; ++i) {
    if(line[i] == '\\') break;
    else name = name + line[i];
  }

  //link
  var link = '';
  ++i;
  for(; i<line.length; ++i) {
    if(line[i] == '\\') break;
    else link = link + line[i];
  }

  x.push(title);
  x.push(name);
  x.push(link);
  return x;
}

// file.on('line', (line) => {
//   //console.log(line)
//   //values.push(get(line));
// });


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!!!");
  var sql = "INSERT INTO book (title, name, link) VALUES ('hhh', 'abc', 'hcn')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});

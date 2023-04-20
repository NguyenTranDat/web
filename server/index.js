const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const port = 9000;

const mysql = require('mysql');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "password",
    database: "web"
});

con.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to database');
});

app.get('/', function (req, res) {
  var sql = "SELECT title, name, link FROM book";
  con.query(sql, function(err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/search', (req, res) => {
  const searchTerm = req.query.term;
  // Truy vấn cơ sở dữ liệu để tìm kiếm sản phẩm thỏa mãn điều kiện
  con.query(`SELECT * FROM book WHERE name LIKE '%${searchTerm}%' OR title LIKE '%${searchTerm}%'`, (error, results) => {
      if (error) {
          console.error('Error querying MySQL database:', error);
          return res.status(500).json({ error });
      }
      res.json(results);
  });
});

app.get('/cart', (req, res) => {
  const cart = req.query.term;
  // Truy vấn cơ sở dữ liệu để tìm kiếm sản phẩm thỏa mãn điều kiện
  con.query(`SELECT * FROM rental INNER JOIN book ON book.book_id = rental.book_id WHERE customer_id = '${cart}'`, (error, results) => {
      if (error) {
          console.error('Error querying MySQL database:', error);
          return res.status(500).json({ error });
      }
      res.json(results);
  });
});

app.post('/update/rental', (req, res) => {
  const { book_id, userID } = req.body;

  const query = `INSERT INTO rental (book_id, customer_id) VALUES ('${book_id}', ${userID})`;

  con.query(query, (err, result) => {
      if (err) throw err;
      console.log(`Insert data ${book_id}, ${userID} done`);
      res.sendStatus(200);
  });
});

const username = 'abc@gmail.com';
const password = 'abc123';

app.post('/api/login', async (req, res) => {
  const { username: reqUsername, password: reqPassword } = req.body;

  // Kiểm tra tài khoản người dùng
  con.query('SELECT * FROM customer WHERE email = ?', [username], async (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu' });
      return;
    }

    if (results.length === 0) {
      res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      return;
    }

    const user = results[0];

    // Kiểm tra mật khẩu người dùng
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (password != user.password) {
      res.status(401).json({ message: user.password });
      return;
    }

    // Tạo token cho người dùng
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'mysecretkey',
      { expiresIn: '1h' }
    );

    // Trả về token cho người dùng
    res.status(200).json({ token });
  });
});

app.get('/api/user', (req, res) => {
  const searchTerm = req.query.term;
  // Truy vấn cơ sở dữ liệu để tìm kiếm sản phẩm thỏa mãn điều kiện
  con.query(`SELECT customer_id FROM customer WHERE email = '${username}' AND password = '${password}'`, (error, results) => {
      if (error) {
          console.error('Error querying MySQL database:', error);
          return res.status(500).json({ error });
      }
      res.json(results);
  });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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
    database: "website"
});

con.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to database');
});

mongoose.connect('mongodb://localhost:27017/web', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB");
});

const bookSchema = new mongoose.Schema({
  _id: String,
  type: String,
  name: String,
  content: String,
});

const Book = mongoose.model('Book', bookSchema, 'book');

app.get('/', async function (req, res) {
  try {
    const results = await Book.find({});
    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/search', async (req, res) => {
  const searchTerm = req.query.term;
  try {
    const results = await Book.find({ $or: [{ name: { $regex: searchTerm, $options: 'i' } }, { type: { $regex: searchTerm, $options: 'i' } }] });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

let username;
let password;


app.post('/update/rental', (req, res) => {
  const { _id, userID } = req.body;
  console.log(_id);

  const query = `INSERT INTO rental (book_id, customer_id) VALUES ('${_id}', ${userID})`;

  con.query(query, (err, result) => {
      if (err) throw err;
      console.log(`Insert data ${_id}, ${userID} done`);
      res.sendStatus(200);
  });
});

app.post('/update/return', (req, res) => {
  const { book_id, customer_id } = req.body;

  const query = `UPDATE rental 
                 SET return_date = now() 
                 WHERE book_id = '${book_id}' 
                   AND customer_id = '${customer_id}'`;

  con.query(query, (err, result) => {
      if (err) throw err;
      console.log(`UPDATE data ${book_id}, ${customer_id} done`);
      res.sendStatus(200);
  });
});

app.post('/api/login', async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  //const { username: reqUsername, password: reqPassword } = req.body;

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

    const customer_id = user.customer_id;

    // Trả về token cho người dùng
    res.status(200).json({ customer_id });
  });
});

app.post('/api/register', async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  //const { username: reqUsername, password: reqPassword } = req.body;
  const firstName=req.body.firstName;
  const lastName=req.body.firstName;
  const phone=req.body.firstName;
  const address=req.body.firstName;

  const query = `INSERT INTO customer (email, password, first_name, last_name, phone, address) VALUES ('${username}', '${password}', '${firstName}', '${lastName}', '${phone}', '${address}')`;

  con.query(query, (err, result) => {
      if (err) throw err;
      console.log(`Insert data ${username}, ${password} done`);
      res.sendStatus(200);
  });
});

app.get('/api/user', (req, res) => {
  // Truy vấn cơ sở dữ liệu để tìm kiếm sản phẩm thỏa mãn điều kiện
  con.query(`SELECT customer_id FROM customer WHERE email = '${username}' AND password = '${password}'`, (error, results) => {
      if (error) {
          console.error('Error querying MySQL database:', error);
          return res.status(500).json({ error });
      }
      res.json(results);
  });
});

app.get('/api/getUser', (req, res) => {
  con.query(`SELECT CONCAT(c.first_name, ' ', c.last_name) AS name,c.phone, c.address, c.age
              FROM customer AS c
              WHERE c.email = '${username}' AND c.password = '${password}'
              GROUP BY c.customer_id`, (error, results) => {
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
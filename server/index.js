const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mysql = require('mysql');
const connectionMySQL = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'website',
});

connectionMySQL.connect((err) => {
    if (err) {
        console.error('Error connecting to database MySQL: ', err);
        return;
    }
    console.log('Connected to database MySQL!');
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/web', { useNewUrlParser: true, useUnifiedTopology: true });
const connectionMongoDB = mongoose.connection;
connectionMongoDB.on('error', console.error.bind(console, 'connection error:'));
connectionMongoDB.once('open', function () {
    console.log("Connected to MongoDB");
});

const bookSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    name: String,
    content: String,
});

const Book = mongoose.model('Book', bookSchema, 'book');


const cassandra = require('cassandra-driver');
const connectionCassandra = new cassandra.Client({
    contactPoints: ['localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'web'
});

connectionCassandra.connect().then(() => {
    console.log('Connected to Cassandra');
}).catch((err) => {
    console.error('Failed to connect to Cassandra', err);
});

app.post('/rental', async (req, res) => {
    const { userID } = req.body;
    let books = [];
    const query = `SELECT * FROM rental WHERE customer_id = ${userID} AND return_date= null ALLOW FILTERING`;
    connectionCassandra.execute(query)
        .then(async (result) => {
            for (let i = 0; i < result.rows.length; ++i) {
                const book = await Book.findById(new mongoose.Types.ObjectId(result.rows[i].book_id));
                if (book) {
                    books.push(book);
                } else {
                    console.log("not found");
                }
            }
            res.status(200).json({ books });
        })
        .catch((err) => {
            console.error('Failed to execute query', err);
            res.status(500).json({ message: 'Failed to execute query' });
        });
});

app.post('/update/rental', async (req, res) => {
    const { _id, userID } = req.body;
    const query = `INSERT INTO rental(rental_id, book_id, customer_id, rental_date) VALUES (uuid(), ?, ?, toTimestamp(now()))`;
    connectionCassandra.execute(query, [_id.toString(), userID], { prepare: true }, function (err) {
        if (err) throw err;
        console.log(`Inserted book with ID ${_id} for ${userID} into Cassandra`);
    })
});

app.post('/update/return', async (req, res) => {
  const { _id, userID } = req.body;

  const query = `SELECT rental_id FROM rental WHERE book_id = ? AND customer_id = ? ALLOW FILTERING`;
  try {
    const result = await connectionCassandra.execute(query, [_id, userID], { prepare: true });

    const updateQueries = result.rows.map(row => {
      console.log(row.rental_id.buffer);
      const updateQuery = `UPDATE rental SET return_date = toTimestamp(now()) WHERE rental_id = ?`;
      return { query: updateQuery, params: [row.rental_id.buffer] };
    });
    await Promise.all(updateQueries.map(q => connectionCassandra.execute(q.query, q.params, { prepare: true })));
    console.log(`Updated rentals for book ID ${_id} to return`);
    res.status(200).json({ message: 'Rental(s) updated successfully' });
  } catch (err) {
    console.error('Failed to execute query', err);
    res.status(500).json({ message: 'Failed to execute query' });
  }
});

app.post('/book', async function (req, res) {
    const { search } = req.body;
    try {
        const regex = new RegExp(search, 'i');
        const results = await Book.find({
            $or: [
                { name: { $regex: regex } },
                { type: { $regex: regex } }
            ]
        });
        res.send(results);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    connectionMySQL.query('SELECT * FROM customer WHERE email = ?', [username], async (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
            return;
        }
        const user = results[0];
        if (password != user.password) {
            res.status(401).json({ message: user.password });
            return;
        }
        const customer_id = user.customer_id;
        res.status(200).json({ customer_id });
    });
});

app.post('/user/info', async (req, res) => {
    const { userID } = req.body;
    connectionMySQL.query(`SELECT concat(first_name, last_name) as name, phone, email, age, address, ad 
                      FROM customer where customer_id = ${userID}`, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: 'Không tìm thấy thông tin người dùng' });
            return;
        }
        const userInfo = results[0];
        res.status(200).json({ userInfo });
    });
});

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
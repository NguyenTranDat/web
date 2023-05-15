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

bookSchema.index({ name: 'text', type: 'text' });

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
    const query = `SELECT * FROM muon WHERE customer_id = ${userID} ALLOW FILTERING`;
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

app.post('/static', async (req, res) => {
    const { limit } = req.body;
    const m = new Map();
    let query = `SELECT book_id FROM tra`;
    try {
        const result = await connectionCassandra.execute(query);
        for(let i = 0; i<result.rows.length; ++i) {
            const key = result.rows[i].book_id;
            if (m.has(key)) {
                m.set(key, { count: m.get(key).count + 1, uniqueCount: m.get(key).uniqueCount });
            } else {
                m.set(key, { count: 1, uniqueCount: 1 });
            }
        }

        query = `SELECT book_id FROM muon`;
        const result1 = await connectionCassandra.execute(query);
        for(let i = 0; i<result1.rows.length; ++i) {
            const key = result1.rows[i].book_id;
            if (m.has(key)) {
                m.set(key, { count: m.get(key).count + 1, uniqueCount: m.get(key).uniqueCount });
            } else {
                m.set(key, { count: 1, uniqueCount: 1 });
            }
        }

        const sortedArray = [...m.entries()].sort((a, b) => b[1].count - a[1].count);
        const top10 = sortedArray.slice(0, limit);
        let books = [];
        for (let i = 0; i < top10.length; ++i) {
            const book = await Book.findById(new mongoose.Types.ObjectId(top10[i][0]));
            if (book) {
                books.push(book);
            } else {
                console.log("not found");
            }
        }
        res.status(200).json({ books });
    } catch(err) {
        console.error('Failed to execute query', err);
    }
});

app.post('/book/borrow', async (req, res) => {
    const { userID } = req.body;
    let books = [];
    const query = `SELECT * FROM tra WHERE customer_id = ${userID} ALLOW FILTERING`;
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
    const query = `INSERT INTO muon(muon_id, book_id, customer_id, rental_date) VALUES (uuid(), ?, ?, toTimestamp(now()))`;
    connectionCassandra.execute(query, [_id.toString(), userID], { prepare: true }, function (err) {
        if (err) throw err;
        console.log(`Inserted book with ID ${_id} for ${userID} into Cassandra`);
    })
});

app.post('/update/return', async (req, res) => {
    const { _id, userID } = req.body;

    const query = `SELECT muon_id FROM muon WHERE book_id = ? AND customer_id = ? ALLOW FILTERING`;

    try {
        const result = await connectionCassandra.execute(query, [_id, userID], { prepare: true });

        const updateQueries = result.rows.map(row => {
            const deleteQuery = `DELETE FROM muon WHERE muon_id = ?`;
            const insertQuery = `INSERT INTO tra(tra_id, book_id, customer_id, return_date) VALUES (uuid(), ?, ?, toTimestamp(now()))`;

            return [
                { query: deleteQuery, params: [row.muon_id.buffer] },
                { query: insertQuery, params: [_id.toString(), userID] }
            ];
        }).flat();

        await Promise.all(updateQueries.map(q => connectionCassandra.execute(q.query, q.params, { prepare: true })));

        res.status(200).json({ message: 'Success' });
    } catch (err) {
        console.error('Failed to execute queries', err);
        res.status(500).json({ message: 'Failed to execute queries' });
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
        if(results.length <= 0) {
            try {
                const books = await Book.find({
                    $or: [
                        { name: { $regex: `.*${search.split('').join('.*')}.*`, $options: 'i' } },
                        { type: { $regex: `.*${search.split('').join('.*')}.*`, $options: 'i' } }
                    ]
                });
                return res.send(books);
            } catch (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }
        }
        return res.send(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    connectionMySQL.query(`SELECT * FROM customer WHERE email = SHA2('${username}', 256) AND password = SHA2('${password}', 256)`, async (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Lỗi khi truy vấn cơ sở dữ liệu' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
            return;
        }
        const user = results[0];

        res.status(200).json({ customer_id: user.customer_id, ad: user.ad });
    });
});

app.post('/api/register', async (req, res) => {
    const { username, password, firstName, lastName, address, phone } = req.body;
    let query = `SELECT * FROM customer WHERE email = SHA2('${username}', 256)`;
    connectionMySQL.query(query, (err, result) => {
        if (err) throw err;
        if(result.length > 0) {
            res.status(400).send('Email đã tồn tại.');
        } else {
            query = `INSERT INTO customer (email, password, first_name, last_name, phone, address) VALUES (SHA2('${username}',256), SHA2('${password}', 256), '${firstName}', '${lastName}', '${phone}', '${address}')`;
            connectionMySQL.query(query, (err, result) => {
                if (err) throw err;
                console.log(`Insert data ${username}, ${password} done`);
                res.sendStatus(200);
            });
        }
    });
});

app.post('/update/password', async (req, res) => {
    const { password, newPassword, userID } = req.body;
    let query = `SELECT password FROM customer WHERE customer_id = ${userID}`;
    
    connectionMySQL.query(query, (err, result) => {
        if (err) throw err;
        if(result[0].password == password) {
            query = `UPDATE customer SET password = SHA2('${newPassword}', 256) WHERE customer_id = ${userID}`;
            connectionMySQL.query(query, (err, result) => {
                if (err) throw err;
                res.sendStatus(200);
            });
        } else {
            res.status(400).send({ message: 'Đổi mật khẩu không thành công.' });
        }
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
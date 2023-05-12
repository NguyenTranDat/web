const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 9000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'website',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database MySQL: ', err);
        return;
    }
    console.log('Connected to database MySQL!');
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    connection.query('SELECT * FROM customer WHERE email = ?', [username], async (error, results) => {
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
    connection.query(`SELECT concat(first_name, last_name) as name, phone, email, age, address, ad 
                      FROM customer where customer_id = ${userID}`, (error, results) => {
        if (error) {
            console.log(error); // log lỗi ra console
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
  

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

// Khởi tạo ứng dụng Express
const app = express();

// Kết nối tới MongoDB
mongoose.connect('mongodb://localhost:27017/web', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Kết nối tới MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'newuser',
    password: 'password',
    database: 'website'
  });
  const bookSchema = new mongoose.Schema({
    _id: String,
    type: String,
    name: String,
    content: String,
  });
  const Book = mongoose.model('Book', bookSchema, 'book');
  
// Thiết lập middleware cho ứng dụng Express
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Định nghĩa một endpoint API để lấy thông tin giỏ hàng
app.post('/cart', async (req, res) => {
  const customerId = req.body.userID;
  console.log(customerId)
  try {
    // Truy vấn dữ liệu từ MongoDB để lấy thông tin sách

    
    const con = await pool.getConnection();

    // Truy vấn dữ liệu từ MySQL để lấy thông tin số lượng sách trong giỏ hàng
     const [rows, fields] = await con.execute(`SELECT COUNT(rental.rental_id) as soluong, rental.book_id, rental.customer_id FROM rental 
                                              WHERE rental.customer_id = '${1}'
                                               and rental.rental_date is not null
                                               and rental.return_date is null
                                              GROUP BY rental.book_id`);

    const books = await Book.find({});

    // Gộp kết quả từ MongoDB và MySQL để trả về thông tin đầy đủ về giỏ hàng
    const cartItems = [];
    books.forEach(book => {
      const row = rows.find(r => r.book_id === book._id.toString());
      if (row) {
        cartItems.push({
          soluong: row.soluong,
          link: book.content,
          name: book.name,
          book_id: row.book_id,
          customer_id: row.customer_id
        });
      }
    });
    res.send(cartItems);
  } catch (error) {
    console.error('Error querying databases:', error);
    res.status(500).json({ error });
  }
});



// Khởi động server và lắng nghe các kết nối tới
app.listen(9001, () => {
  console.log('Server started on port 3000');
});

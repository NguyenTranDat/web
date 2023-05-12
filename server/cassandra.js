const cassandra = require('cassandra-driver');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 9002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const client = new cassandra.Client({ 
    contactPoints: ['localhost'], 
    localDataCenter: 'datacenter1', 
    keyspace: 'web' 
  });

client.connect()
  .then(() => {
    console.log('Connected to Cassandra');
  })
  .catch((err) => {
    console.error('Failed to connect to Cassandra', err);
  });

  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/web', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
      console.log("Connected to MongoDB");
  });

const bookSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String,
    name: String,
    content: String,
});

const Book = mongoose.model('Book', bookSchema, 'book');

app.post('/rental', async (req, res) => {
    const { userID } = req.body;
    let books = [];
    const query = `SELECT * FROM rental WHERE customer_id = ${userID} ALLOW FILTERING`;
    client.execute(query)
        .then(async (result) => {
            for(let i = 0; i < result.rows.length; ++i) {
                const book = await Book.findById(new mongoose.Types.ObjectId(result.rows[i].book_id));
                if(book) {
                    books.push(book);
                } else {
                    console.log("not found");
                }
            }
            res.status(200).json({books});
        })
        .catch((err) => {
            console.error('Failed to execute query', err);
            res.status(500).json({ message: 'Failed to execute query' });
        });
});
  

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
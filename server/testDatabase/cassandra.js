const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ 
  contactPoints: ['localhost'], 
  localDataCenter: 'datacenter1', 
  keyspace: 'web' 
});

// Kết nối vào Cassandra
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


// Thực hiện một truy vấn đến Cassandra
const query = 'SELECT * FROM rental';
client.execute(query)
  .then(async (result) => {
    for(let i = 0; i < result.rows.length; ++i) {
        console.log(result.rows[i].book_id);
        const book = await Book.findById(new mongoose.Types.ObjectId(result.rows[i].book_id));
        if(book) {
            console.log(book);
        } else {
            console.log("not found");
        }
    }
  })
  .catch((err) => {
    console.error('Failed to execute query', err);
  });

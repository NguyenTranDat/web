const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { FuzzySearch } = require('mongoose-fuzzy-search');

const port = 9001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/web', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

const bookSchema = new mongoose.Schema({
    type: String,
    name: String,
    content: String,
});

const Book = mongoose.model('Book', bookSchema, 'book');

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

app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});
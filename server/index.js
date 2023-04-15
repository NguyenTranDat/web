const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const booksRoutes = require('./getBook');
const authRoutes = require('./auth');

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.use(cors());

app.use('/', booksRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const con = require('./connectDatabase');

const JWT_SECRET = 'secret';

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.userId = decoded.id;
    next();
  });
}

router.post('/register', (req, res) => {
  const { username, password } = req.body;

  con.query(`SELECT * FROM customer WHERE username='${username}'`, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      res.send({ success: false, message: 'Username already exists.' });
    } else {
      con.query(`INSERT INTO customer (username, password) VALUES ('${username}', '${password}')`, (err, result) => {
        if (err) {
          throw err;
        }

        res.send({ success: true, message: 'User registered successfully.' });
      });
    }
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  con.query(`SELECT * FROM customer WHERE username='${username}' AND password='${password}'`, (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length > 0) {
      const user = { id: result[0].id };
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

      res.send({ auth: true, token: token });
    } else {
      res.send({ auth: false, message: 'Invalid username or password.' });
    }
  });
});

router.get('/protected', verifyToken, (req, res) => {
  res.send({ message: 'This is a protected route.' });
});

module.exports = router;
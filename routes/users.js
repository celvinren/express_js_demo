// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

router.get('/', async (req, res) => {
  console.log('GET /users');
  try {
    const result = await db.query('SELECT id, firstname, lastname, email FROM users');
    const userList = result.rows;

    console.log(result);
    res.json(userList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while getting current time");
  }
});

router.get('/:id', async (req, res) => {
  console.log('GET /users');
  try {
    const result = await db.query('SELECT id, firstname, lastname, email FROM users where id = $1', [req.params.id]);
    const user = result.rows;

    // console.log(result);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error while getting current time");
  }
});

router.post('/', (req, res) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.status(201).json(user);
});

router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  res.json(user);
});

router.delete('/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;

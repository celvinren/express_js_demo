const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json()); // for parsing JSON formatted request bodies

// use users routes
app.use('/users', userRoutes);

// RESTful API routes
app.get('/', (req, res) => {
  res.send('Welcome to the RESTful API!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

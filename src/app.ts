import express from 'express';
import auth from './routes/auth';
import users from './routes/users';
const app = express();

app.use(express.json()); // for parsing JSON formatted request bodies

// use users routes
app.use('/users', users);
app.use('/auth', auth);

// RESTful API routes
app.get('/', (req, res: any) => {
  res.send('Welcome to the RESTful API!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

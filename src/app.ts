import express from 'express';
import { router } from './routes/users';
const app = express();

app.use(express.json()); // for parsing JSON formatted request bodies

// use users routes
app.use('/users', router);

// RESTful API routes
app.get('/', (res: any) => {
  res.send('Welcome to the RESTful API!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// routes/users.js
import { Router } from 'express';
import { getUser, getUsers } from '../controllers/usersController';
import { authenticateToken, generateAccessToken } from '../middlewares/authMiddleware';
import { User } from '../models/userModel';

const router = Router();

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

router.get('/', authenticateToken, getUsers);

router.get('/:id', authenticateToken, getUser);

router.post('/', (req: any, res: any) => {
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.status(201).json(user);
});

router.put('/:id', (req: any, res: any) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  res.json(user);
});

router.delete('/:id', (req: any, res: any) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});


router.post('/refreshToken', (req: any, res: any) => {
  // // get refresh token from request body
  // const refreshToken = req.body.refreshToken;
  // if (refreshToken == null) return res.sendStatus(401); // did not provide refresh token, return 401 Unauthorized

  // TODO: implement refresh token verification, and check user's details in the database

  // // generate new access token
  const user: User = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
  const accessToken = generateAccessToken(user);
  res.json({ accessToken });
});

export { router };


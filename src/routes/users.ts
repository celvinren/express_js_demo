// routes/users.js
import { Router } from 'express';
import { getUser, getUsers } from '../controllers/usersController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

let _users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

router.get('/', authenticateToken, async (req: any, res: any) => {
  console.log('GET /users');
  try {
    const result = await getUsers();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while getting current time");
  }

});

router.get('/:id', authenticateToken, async (req: any, res: any) => {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while getting current time");
  }
});

router.post('/', (req: any, res: any) => {
  const user = {
    id: _users.length + 1,
    name: req.body.name
  };
  _users.push(user);
  res.status(201).json(user);
});

router.put('/:id', (req: any, res: any) => {
  const user = _users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  res.json(user);
});

router.delete('/:id', (req: any, res: any) => {
  _users = _users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

export default router;


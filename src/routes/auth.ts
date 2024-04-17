import { Router } from 'express';
import { login, signUp } from '../controllers/authController';
import { generateAccessToken } from '../middlewares/authMiddleware';
import { User } from '../models/userModel';

const router = Router();

router.post('/signup', async (req, res) => {
    const user: User = req.body;
    try {
        const newUser = await signUp(user);
        const token = generateAccessToken(newUser);

        res.status(201).json({ result: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const verifiedUser: User = await login(email, password);
        const token = generateAccessToken(verifiedUser);

        res.status(200).json({ result: verifiedUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

export default router;
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { login, signUp } from '../controllers/authController';
import { getUser } from '../controllers/usersController';
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

router.post('/refreshToken', async (req: any, res: any) => {
    const user: User = req.body;
    // get refresh token from request body
    const refreshToken = req.headers['authorization']?.split(' ')[1];
    if (refreshToken == null) return res.sendStatus(401); // did not provide refresh token, return 401 Unauthorized

    // verify refresh token
    var parsedUser;
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!, { algorithms: ['HS256'] }); // replace with your refresh token secret
        parsedUser = decoded as User;
    } catch {
        return res.sendStatus(403); // invalid refresh token, return 403 Forbidden
    }

    // Compare the user in the request body with the user in the refresh token
    const isSameUser = parsedUser.id === user.id &&
        parsedUser.first_name === user.first_name &&
        parsedUser.last_name === user.last_name &&
        parsedUser.email === user.email;
    if (!isSameUser) return res.sendStatus(403);

    // Check if the user exists in the database and is the same as the user in the refresh token
    const existingUser = await getUser(user.id!);
    if (!existingUser) return res.sendStatus(403);
    const isSameUserInDatabase = existingUser.id === user.id &&
        existingUser.first_name === user.first_name &&
        existingUser.last_name === user.last_name &&
        existingUser.email === user.email;
    if (!isSameUserInDatabase) return res.sendStatus(403);

    // // generate new access token
    const token = generateAccessToken(user);
    res.json({ token });
});
export default router;
import { User } from "../models/userModel";

const jwt = require('jsonwebtoken');

// generate JWT
function generateAccessToken(user: User) {
  return jwt.sign(user, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '2h' });
}

// user verification
function authenticateToken(req: any, res: any, next: Function) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // did not provide access token, return 401 Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] }, (err: DOMException, user: User) => {
    if (err) return res.sendStatus(403); // token is invalid, return 403 Forbidden
    req.user = user;
    next(); // token is valid, continue
  });
}

export {
  authenticateToken, generateAccessToken
};


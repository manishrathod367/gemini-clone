
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, process.env.JWT_SECRET || 'yoursecretkey', (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalid' });

    req.user = user;
    next();
  });
};

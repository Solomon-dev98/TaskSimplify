import jwt from 'jsonwebtoken';

// Middleware to verify JWT token

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Access denied. No token provided');
    }

    try {
        // verify token
        const decoded = jwt.verify(token.split(' ')[1], 'your_jwt_secret');
        req.user = decoded; // store the decoded user information in the request object
        next();
    } catch (error) {
        return res.status(401).send('Invalid token.');
    }
};
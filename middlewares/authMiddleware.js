import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to verify JWT token

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Authorization header:', token);

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ success: false, message: 'Access denied. No token provided'});
    }

    try {
        // verify token
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded; // store the decoded user information in the request object
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired.' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};
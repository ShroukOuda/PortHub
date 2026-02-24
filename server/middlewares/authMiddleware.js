const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    console.log('🔐 Auth Middleware - Headers:', req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log('🔐 Auth Middleware - Token extracted:', token ? 'YES' : 'NO');

    if (!token) {
        console.log('🔐 Auth Middleware - No token found, returning 401');
        return res.status(401).json({ message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('🔐 Auth Middleware - Token decoded, userId:', decoded.userId);
   
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            console.log('🔐 Auth Middleware - User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        console.log('🔐 Auth Middleware - Success, user:', user.email);
        next();
    } catch (error) {
        console.log('🔐 Auth Middleware - Token verification failed:', error.message);
        return res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

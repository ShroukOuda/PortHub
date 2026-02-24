const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Like authMiddleware, but doesn't reject unauthenticated requests.
// If a valid token is present, req.user is populated; otherwise req.user stays undefined.
const optionalAuthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (user) {
            req.user = user;
        }
    } catch (error) {
        // Token invalid/expired — just proceed without user
    }

    next();
};

module.exports = optionalAuthMiddleware;

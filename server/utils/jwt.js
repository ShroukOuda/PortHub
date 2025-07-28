const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;

const generateToken = async (user) => {
    return await jwt.sign({ 
        userId: user._id,  // FIXED LINE
        username: user.username, 
        email: user.email, 
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    }, jwtSecret, { expiresIn: jwtExpiration });
}

module.exports = {
    generateToken
};
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const jwtExpiration = process.env.JWT_EXPIRATION;

const generateToken = async (user) => {
    return await jwt.sign({ 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        firstName: user.firstName,
        lastName: user.lastName 
    }, jwtSecret, { expiresIn: jwtExpiration });
}

module.exports = {
    generateToken
};
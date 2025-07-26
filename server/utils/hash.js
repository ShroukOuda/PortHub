const bcrypt = require('bcryptjs');
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
}

const comparedPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparedPassword
};
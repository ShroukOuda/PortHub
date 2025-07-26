const validator = require('validator');

const isValidEmail = (email) => {
    return validator.isEmail(email);
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isValidPassword = async (password) => {
    return passwordRegex.test(password);
}

module.exports = {
    isValidEmail,
    isValidPassword
};

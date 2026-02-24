const validator = require('validator');

const isValidEmail = (email) => {
    return validator.isEmail(email);
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const isValidPassword = (password) => {
    return passwordRegex.test(password);
}

// Validate phone number - supports international formats
const isValidPhone = (phone) => {
    if (!phone) return false;
    // Remove spaces, dashes, parentheses for validation
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    // Check if it's a valid mobile phone (international format)
    return validator.isMobilePhone(cleanPhone, 'any', { strictMode: false });
}

// Get phone validation details
const getPhoneValidationDetails = (phone) => {
    if (!phone) {
        return { valid: false, message: 'Phone number is required' };
    }
    
    const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
    
    // Check minimum length (at least 7 digits)
    if (cleanPhone.replace(/\D/g, '').length < 7) {
        return { valid: false, message: 'Phone number is too short' };
    }
    
    // Check maximum length (no more than 15 digits per ITU-T E.164)
    if (cleanPhone.replace(/\D/g, '').length > 15) {
        return { valid: false, message: 'Phone number is too long' };
    }
    
    // Check for valid characters
    if (!/^[\+]?[0-9\s\-\(\)\.]+$/.test(phone)) {
        return { valid: false, message: 'Phone number contains invalid characters' };
    }
    
    // Use validator for mobile phone check
    if (!validator.isMobilePhone(cleanPhone, 'any', { strictMode: false })) {
        return { valid: false, message: 'Invalid phone number format' };
    }
    
    return { valid: true, message: 'Phone number is valid' };
}

module.exports = {
    isValidEmail,
    isValidPassword,
    isValidPhone,
    getPhoneValidationDetails
};

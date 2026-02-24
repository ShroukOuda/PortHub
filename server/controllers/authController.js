require('dotenv').config();
const userModel = require('../models/User');
const { hashPassword, comparedPassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { isValidEmail, isValidPassword, isValidPhone, getPhoneValidationDetails } = require('../utils/validators');
const { sendPasswordResetEmail, sendWelcomeEmail } = require('../utils/emailService');
const dns = require('dns');
const { promisify } = require('util');

const resolveMx = promisify(dns.resolveMx);

// Verify email domain has valid MX records
const verifyEmailDomain = async (email) => {
    try {
        const domain = email.split('@')[1];
        const mxRecords = await resolveMx(domain);
        return mxRecords && mxRecords.length > 0;
    } catch (error) {
        return false;
    }
};


const registerUser = async (req, res) => {
    const profilePicture = req.file ? req.file.path : null; // Handle profile picture upload
    const { firstName, lastName, username, email, password, phone, gender, dateOfBirth, bio, country, city, address, role, jobTitle } = req.body;

    try {
        if (!firstName || !username || !email || !password || !phone || !gender || !bio ||  !dateOfBirth || !country || !city || !address || !jobTitle) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Verify email domain exists (has MX records)
        const isEmailDomainValid = await verifyEmailDomain(email);
        if (!isEmailDomainValid) {
            return res.status(400).json({ message: 'Invalid email domain. Please use a valid email address.' });
        }

        // Validate phone number
        const phoneValidation = getPhoneValidationDetails(phone);
        if (!phoneValidation.valid) {
            return res.status(400).json({ message: phoneValidation.message });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            });
        }

        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Email or username already exists' });
        }

        await userModel.create({
            firstName,
            lastName,
            username,
            email,
            phone,
            gender,
            dateOfBirth,
            country,
            city,
            address,
            bio,
            profilePicture,
            jobTitle,
            password: await hashPassword(password),
            role: role || 'user'
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Register Error:', error); 
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};


// User login
const loginUser = async (req, res) => {
    const { login, password } = req.body;

    try {
        if (!login || !password) {
            return res.status(400).json({ message: 'email and password are required' });
        }
        const user = await userModel.findOne({ $or: [{ username: login }, { email: login }] })
    
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await comparedPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ accessToken: null, message: 'Invalid email or password' });
        }
        
        const token = await generateToken(user);
        res.status(200).json({ 
            message: 'Login successful', 
            accessToken: token, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phone: user.phone,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                country: user.country,
                city: user.city,
                address: user.address,
                bio: user.bio,
                profilePicture: user.profilePicture,
                jobTitle: user.jobTitle
            }
        });
    
    } catch (error) {
        return res.status(500).json({ message: 'Invalid email or password', error: error.message });
    }
};

// logoutUser
const logoutUser = (req, res) => {
    try {
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out user', error: error.message });
    }
};

// Check if username exists
const checkUsername = async (req, res) => {
    const { username } = req.query;
    try {
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        const existingUser = await userModel.findOne({ username });
        res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        res.status(500).json({ message: 'Error checking username', error: error.message });
    }
};

// Check if email exists
const checkEmail = async (req, res) => {
    const { email } = req.query;
    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const existingUser = await userModel.findOne({ email });
        res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        res.status(500).json({ message: 'Error checking email', error: error.message });
    }
};

// Validate email format and domain
const validateEmail = async (req, res) => {
    const { email } = req.query;
    try {
        if (!email) {
            return res.status(400).json({ valid: false, message: 'Email is required' });
        }
        
        // Check format
        if (!isValidEmail(email)) {
            return res.status(200).json({ valid: false, message: 'Invalid email format' });
        }
        
        // Check domain
        const isDomainValid = await verifyEmailDomain(email);
        if (!isDomainValid) {
            return res.status(200).json({ valid: false, message: 'Email domain does not exist' });
        }
        
        res.status(200).json({ valid: true, message: 'Email is valid' });
    } catch (error) {
        res.status(500).json({ valid: false, message: 'Error validating email', error: error.message });
    }
};

// Validate phone number
const validatePhone = (req, res) => {
    const { phone } = req.query;
    try {
        if (!phone) {
            return res.status(400).json({ valid: false, message: 'Phone number is required' });
        }
        
        const validation = getPhoneValidationDetails(phone);
        res.status(200).json(validation);
    } catch (error) {
        res.status(500).json({ valid: false, message: 'Error validating phone', error: error.message });
    }
};

// Forgot password - send reset code
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const user = await userModel.findOne({ email });
        if (!user) {
            // Don't reveal if email exists for security
            return res.status(200).json({ message: 'If the email exists, a reset code has been sent' });
        }
        
        // Generate 6-digit reset code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        
        user.resetCode = resetCode;
        user.resetCodeExpiry = resetCodeExpiry;
        await user.save();
        
        // Send email with reset code
        const emailResult = await sendPasswordResetEmail(email, resetCode, user.firstName);
        
        console.log('Email result:', emailResult);
        
        if (emailResult.success) {
            // Email sent successfully - don't show code on screen
            console.log(`📧 Password reset code sent to ${email}`);
            res.status(200).json({ 
                message: 'A reset code has been sent to your email. Please check your inbox.'
            });
        } else {
            // Email failed - show code for development only
            console.log(`⚠️ Email failed: ${emailResult.error}. Code for ${email}: ${resetCode}`);
            res.status(200).json({ 
                message: 'Could not send email. Use the code below:',
                resetCode: resetCode,
                error: emailResult.error
            });
        }
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
};

// Verify reset code
const verifyResetCode = async (req, res) => {
    const { email, code } = req.body;
    
    try {
        if (!email || !code) {
            return res.status(400).json({ valid: false, message: 'Email and code are required' });
        }
        
        const user = await userModel.findOne({ 
            email,
            resetCode: code,
            resetCodeExpiry: { $gt: new Date() }
        });
        
        if (!user) {
            return res.status(400).json({ valid: false, message: 'Invalid or expired reset code' });
        }
        
        res.status(200).json({ valid: true, message: 'Code verified successfully' });
    } catch (error) {
        res.status(500).json({ valid: false, message: 'Error verifying code', error: error.message });
    }
};

// Reset password with code
const resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    
    try {
        if (!email || !code || !newPassword) {
            return res.status(400).json({ message: 'Email, code, and new password are required' });
        }
        
        if (!isValidPassword(newPassword)) {
            return res.status(400).json({ 
                message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character' 
            });
        }
        
        const user = await userModel.findOne({ 
            email,
            resetCode: code,
            resetCodeExpiry: { $gt: new Date() }
        });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset code' });
        }
        
        user.password = await hashPassword(newPassword);
        user.resetCode = undefined;
        user.resetCodeExpiry = undefined;
        await user.save();
        
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};

// OAuth callback handler - generates token and redirects
const oauthCallback = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:4200'}/login?error=auth_failed`);
        }
        
        const token = await generateToken(user);
        
        // Redirect to frontend with token
        const redirectUrl = `${process.env.CLIENT_URL || 'http://localhost:4200'}/auth/callback?token=${token}&userId=${user._id}`;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('OAuth callback error:', error);
        res.redirect(`${process.env.CLIENT_URL || 'http://localhost:4200'}/login?error=auth_failed`);
    }
};

// Get user data for OAuth callback
const getOAuthUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                phone: user.phone,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                country: user.country,
                city: user.city,
                address: user.address,
                bio: user.bio,
                profilePicture: user.profilePicture,
                jobTitle: user.jobTitle,
                authProvider: user.authProvider
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    checkUsername,
    checkEmail,
    validateEmail,
    validatePhone,
    oauthCallback,
    getOAuthUser,
    forgotPassword,
    verifyResetCode,
    resetPassword
};
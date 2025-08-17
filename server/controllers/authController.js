require('dotenv').config();
const userModel = require('../models/User');
const { hashPassword, comparedPassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { isValidEmail, isValidPassword } = require('../utils/validators');

const registerUser = async (req, res) => {
    const { firstName, lastName, username, email, password, phone, gender, dateOfBirth, country, city, address, role } = req.body;

    try {
        if (!firstName || !username || !email || !password || !phone || !gender || !dateOfBirth || !country || !city || !address) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
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
                address: user.address
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

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
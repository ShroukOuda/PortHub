require('dotenv').config();
const userModel = require('../models/User');
const { hashPassword, comparedPassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');
const { isValidEmail, isValidPassword } = require('../utils/validators');

const registerUser = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    try {
        if (!firstName || !username || !email || !password) {
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
            password: await hashPassword(password),
        });

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Register Error:', error); // 👈 helpful for debugging
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
        
        const token = generateToken(user);
        res.status(200).json({ 
            message: 'Login successful', 
            accessToken: token, 
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });
    
    } catch (error) {
        return res.status(500).json({ message: 'Invalid email or password', error: error.message });
    }
};


// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, username, email, password } = req.body;

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            user.password = await hashPassword(password);
        }

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};  

// Delete user
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};  